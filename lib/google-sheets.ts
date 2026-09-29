import { google } from "googleapis";

import { LEAD_STATUS_LABELS, leadStatusFromSheetValue } from "@/types/lead";
import type { Lead, LeadStatus } from "@/types/lead";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function sheetTitleFromRange(range: string) {
  const separator = range.indexOf("!");
  return separator === -1 ? "" : range.slice(0, separator).replace(/^'|'$/g, "");
}

async function sheetsClient() {
  const sheetId = env("GOOGLE_SHEET_ID");
  const credentials = env("GOOGLE_SERVICE_ACCOUNT_JSON");
  if (!sheetId || !credentials) return null;

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return { sheetId, sheets: google.sheets({ version: "v4", auth }) };
}

export async function configureLeadStatusValidation() {
  const client = await sheetsClient();
  if (!client) return "skipped" as const;

  const configuredRange = env("GOOGLE_SHEET_RANGE") || "Leads!A:Z";
  const title = sheetTitleFromRange(configuredRange);
  const spreadsheet = await client.sheets.spreadsheets.get({
    spreadsheetId: client.sheetId,
    fields: "sheets.properties(sheetId,title)",
  });
  const tab = spreadsheet.data.sheets?.find((sheet) => sheet.properties?.title === title)
    ?? spreadsheet.data.sheets?.[0];
  const sheetId = tab?.properties?.sheetId;
  if (sheetId === undefined) throw new Error("GOOGLE_SHEET_TAB_NOT_FOUND");
  const statusOptions = [...new Set(Object.values(LEAD_STATUS_LABELS))] as string[];

  await client.sheets.spreadsheets.batchUpdate({
    spreadsheetId: client.sheetId,
    requestBody: {
      requests: [{
        setDataValidation: {
          range: { sheetId, startRowIndex: 1, startColumnIndex: 9, endColumnIndex: 10 },
          rule: {
            condition: {
              type: "ONE_OF_LIST",
              values: statusOptions.map((value) => ({ userEnteredValue: value })),
            },
            strict: true,
            showCustomUi: true,
          },
        },
      }],
    },
  });
  return "sent" as const;
}

export type SheetLeadStatus = { createdAt: string; email: string; status: LeadStatus };

export async function getLeadStatusesFromGoogleSheets(): Promise<SheetLeadStatus[] | null> {
  const client = await sheetsClient();
  if (!client) return null;

  const configuredRange = env("GOOGLE_SHEET_RANGE") || "Leads!A:Z";
  const title = sheetTitleFromRange(configuredRange) || "Leads";
  const response = await client.sheets.spreadsheets.values.get({
    spreadsheetId: client.sheetId,
    range: `${title}!A:K`,
    valueRenderOption: "FORMATTED_VALUE",
  });
  return (response.data.values || []).slice(1).flatMap((row) => {
    const createdAt = String(row[0] || "").trim();
    const email = String(row[2] || "").trim().toLowerCase();
    const status = leadStatusFromSheetValue(String(row[9] || ""));
    return createdAt && email && status ? [{ createdAt, email, status }] : [];
  });
}

export async function appendToGoogleSheets(lead: Lead) {
  const client = await sheetsClient();
  const range = env("GOOGLE_SHEET_RANGE") || "A:Z";
  if (!client) return "skipped" as const;

  await configureLeadStatusValidation();
  await client.sheets.spreadsheets.values.append({
    spreadsheetId: client.sheetId,
    range,
    // Keep the ISO timestamp intact so the sheet status can be matched to its MongoDB lead.
    valueInputOption: "RAW",
    requestBody: {
      values: [[
        lead.createdAt.toISOString(),
        lead.name,
        lead.email,
        lead.phone || "",
        lead.company || "",
        lead.message,
        lead.requestType || "",
        lead.preferredDate || "",
        lead.preferredTime || "",
        LEAD_STATUS_LABELS[lead.status],
        lead.source || "",
      ]],
    },
  });
  return "sent" as const;
}
