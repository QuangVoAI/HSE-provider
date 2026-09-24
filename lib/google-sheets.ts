import { google } from "googleapis";

import type { Lead } from "@/types/lead";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

export async function appendToGoogleSheets(lead: Lead) {
  const sheetId = env("GOOGLE_SHEET_ID");
  const credentials = env("GOOGLE_SERVICE_ACCOUNT_JSON");
  const range = env("GOOGLE_SHEET_RANGE") || "A:Z";
  if (!sheetId || !credentials) return "skipped" as const;

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "USER_ENTERED",
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
        lead.status,
        lead.source || "",
      ]],
    },
  });
  return "sent" as const;
}
