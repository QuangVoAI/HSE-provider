import { NextResponse } from "next/server";

import { configureLeadStatusValidation } from "@/lib/google-sheets";
import { runLeadReminderWorkflow } from "@/lib/lead-reminders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET?.trim()) {
    return NextResponse.json({ error: "CRON_SECRET_NOT_CONFIGURED" }, { status: 503 });
  }
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const validation = await configureLeadStatusValidation();
    const result = await runLeadReminderWorkflow();
    return NextResponse.json({ ok: true, validation, ...result });
  } catch (error) {
    console.error("Lead reminder workflow failed", error);
    return NextResponse.json({ error: "LEAD_REMINDER_WORKFLOW_FAILED" }, { status: 500 });
  }
}
