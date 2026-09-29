import type { WithId } from "mongodb";

import { sendLeadReminderEmail } from "@/lib/email";
import { getLeadStatusesFromGoogleSheets } from "@/lib/google-sheets";
import type { SheetLeadStatus } from "@/lib/google-sheets";
import { mongoCollection } from "@/lib/mongodb";
import { recordLeadReminder, updateLeadStatus } from "@/lib/lead-repository";
import type { Lead } from "@/types/lead";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function positiveHours(name: string, fallback: number) {
  const value = Number(env(name));
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function parseSheetTimestamp(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function sameSubmission(lead: Lead, sheetLead: SheetLeadStatus) {
  if (lead.emailNormalized !== sheetLead.email) return false;
  const sheetTimestamp = parseSheetTimestamp(sheetLead.createdAt);
  if (sheetTimestamp === null) return true;
  return Math.abs(lead.createdAt.getTime() - sheetTimestamp) < 12 * 60 * 60 * 1000;
}

async function syncLeadStatuses(sheetLeads: SheetLeadStatus[]) {
  const collection = await mongoCollection();
  const activeLeads = await collection.find({
    status: { $in: ["new", "contacted", "scheduled", "quoted"] },
  }).toArray();
  let synced = 0;

  for (const lead of activeLeads) {
    const sheetLead = sheetLeads.find((entry) => sameSubmission(lead, entry));
    if (!sheetLead || sheetLead.status === lead.status) continue;
    await updateLeadStatus(lead._id, sheetLead.status);
    synced += 1;
  }
  return synced;
}

export type LeadReminderResult = {
  configured: boolean;
  synced: number;
  remindersSent: number;
  remindersSkipped: number;
};

export async function runLeadReminderWorkflow(): Promise<LeadReminderResult> {
  const sheetLeads = await getLeadStatusesFromGoogleSheets();
  if (sheetLeads === null) {
    return { configured: false, synced: 0, remindersSent: 0, remindersSkipped: 0 };
  }

  const synced = await syncLeadStatuses(sheetLeads);
  const afterHours = positiveHours("LEAD_REMINDER_AFTER_HOURS", 24);
  const repeatHours = positiveHours("LEAD_REMINDER_REPEAT_HOURS", 24);
  const now = Date.now();
  const overdueBefore = new Date(now - afterHours * 60 * 60 * 1000);
  const repeatBefore = new Date(now - repeatHours * 60 * 60 * 1000);
  const collection = await mongoCollection();
  const candidates = await collection.find({
    status: "new",
    createdAt: { $lte: overdueBefore },
    $or: [
      { reminder: { $exists: false } },
      { "reminder.lastSentAt": { $lte: repeatBefore } },
    ],
  }).toArray();

  let remindersSent = 0;
  let remindersSkipped = 0;
  for (const lead of candidates as WithId<Lead>[]) {
    const stillNew = sheetLeads.some((entry) => entry.status === "new" && sameSubmission(lead, entry));
    if (!stillNew) {
      remindersSkipped += 1;
      continue;
    }
    const emailStatus = await sendLeadReminderEmail(lead, afterHours);
    if (emailStatus === "sent") {
      await recordLeadReminder(lead._id, (lead.reminder?.sentCount || 0) + 1);
      remindersSent += 1;
    } else {
      remindersSkipped += 1;
    }
  }

  return { configured: true, synced, remindersSent, remindersSkipped };
}
