import type { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/email";
import { appendToGoogleSheets } from "@/lib/google-sheets";
import {
  createLead,
  findDuplicate,
  insertLead,
  normalized,
  updateLeadIntegrations,
} from "@/lib/lead-repository";
import {
  isValidEmail,
  hasValidLeadTypes,
  isValidPreferredTime,
  isValidPreferredDate,
  isValidVietnamPhone,
  normalizeVietnamPhone,
} from "@/lib/lead-validation";
import type { IntegrationStatus, LeadInput } from "@/types/lead";

export const runtime = "nodejs";

const requestWindows = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  try {
    const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const nowMs = Date.now();
    const window = requestWindows.get(address);
    if (!window || window.resetAt <= nowMs) {
      requestWindows.set(address, { count: 1, resetAt: nowMs + 10 * 60 * 1000 });
    } else if (window.count >= 5) {
      return NextResponse.json(
        { error: "RATE_LIMITED", message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút." },
        { status: 429 },
      );
    } else {
      window.count += 1;
    }

    const invalidLead = () => NextResponse.json(
      { error: "INVALID_LEAD", message: "Vui lòng kiểm tra thông tin yêu cầu." },
      { status: 400 },
    );
    let payload: unknown;
    try { payload = await request.json(); } catch { return invalidLead(); }
    if (!hasValidLeadTypes(payload)) return invalidLead();
    const body = payload;
    const name = normalized(body.name);
    const email = normalized(body.email).toLowerCase();
    const message = normalized(body.message);
    const phone = normalized(body.phone);
    const company = normalized(body.company);
    const preferredDate = normalized(body.preferredDate);
    if (
      name.length < 2 || name.length > 100 ||
      !isValidEmail(email) ||
      message.length < 5 || message.length > 2000 ||
      company.length > 150 ||
      !phone || !isValidVietnamPhone(phone) ||
      !isValidPreferredDate(preferredDate) ||
      !isValidPreferredTime(normalized(body.preferredTime))
    ) {
      return NextResponse.json(
        { error: "INVALID_LEAD", message: "Vui lòng kiểm tra họ tên, email, số điện thoại, ngày tư vấn và nội dung yêu cầu." },
        { status: 400 },
      );
    }

    if (process.env.DEMO_MODE === "true") {
      return NextResponse.json(
        {
          ok: true,
          demo: true,
          leadId: `demo-${crypto.randomUUID()}`,
          integration: { email: "skipped", sheets: "skipped" },
        },
        { status: 201 },
      );
    }

    const phoneNormalized = normalizeVietnamPhone(phone);
    let duplicateOf: string | undefined;
    try {
      const duplicate = await findDuplicate(email, phoneNormalized);
      if (duplicate) duplicateOf = String(duplicate._id);
    } catch (err) {
      console.warn("Mongo duplicate check failed, continuing:", err);
    }

    const lead = createLead(body as LeadInput, email, phone, phoneNormalized, duplicateOf);
    let mongoInsertedId: ObjectId | null = null;
    try {
      const result = await insertLead(lead);
      mongoInsertedId = result.insertedId;
    } catch (err) {
      console.error("MongoDB insert failed, falling back to Email & Google Sheets:", err);
    }

    let emailStatus: IntegrationStatus = "skipped";
    let sheetsStatus: IntegrationStatus = "skipped";
    try {
      emailStatus = await sendLeadEmail(lead);
    } catch (error) {
      console.error("Lead email integration failed", error);
      emailStatus = "failed";
    }
    try {
      sheetsStatus = await appendToGoogleSheets(lead);
    } catch (error) {
      console.error("Google Sheets integration failed", error);
      sheetsStatus = "failed";
    }

    if (mongoInsertedId) {
      try {
        await updateLeadIntegrations(mongoInsertedId, emailStatus, sheetsStatus);
      } catch (err) {
        console.warn("Updating lead integrations in Mongo failed:", err);
      }
    }

    const isSuccess = mongoInsertedId !== null || emailStatus === "sent" || sheetsStatus === "synced";
    if (isSuccess) {
      return NextResponse.json(
        {
          ok: true,
          leadId: mongoInsertedId ? String(mongoInsertedId) : `fallback-${crypto.randomUUID()}`,
          duplicateOf: lead.duplicateOf,
          integration: { email: emailStatus, sheets: sheetsStatus },
        },
        { status: 201 },
      );
    }

    return NextResponse.json(
      { error: "LEAD_API_ERROR", message: "Không thể tiếp nhận yêu cầu lúc này." },
      { status: 500 },
    );
  } catch (error) {
    console.error("Lead API failed", error);
    return NextResponse.json(
      { error: "LEAD_API_ERROR", message: "Không thể tiếp nhận yêu cầu lúc này." },
      { status: 500 },
    );
  }
}
