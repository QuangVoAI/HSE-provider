import nodemailer from "nodemailer";

import type { Lead } from "@/types/lead";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

export async function sendLeadEmail(lead: Lead) {
  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const admin = env("LEAD_NOTIFICATION_EMAIL");
  if (!host || !user || !pass || !admin) return "skipped" as const;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(env("SMTP_PORT") || 587),
    secure: env("SMTP_SECURE") === "true",
    auth: { user, pass },
  });
  const from = env("SMTP_FROM") || user;
  const subject = `[HSE Provider] Lead mới: ${lead.name}`;
  const text = [
    `Họ tên: ${lead.name}`,
    `Email: ${lead.email}`,
    `Điện thoại: ${lead.phone || "-"}`,
    `Công ty: ${lead.company || "-"}`,
    `Nhu cầu: ${lead.requestType || "-"}`,
    `Ngày mong muốn: ${lead.preferredDate || "-"}`,
    `Khung giờ: ${lead.preferredTime || "-"}`,
    "",
    lead.message,
  ].join("\n");

  await transporter.sendMail({ from, to: admin, replyTo: lead.email, subject, text });
  await transporter.sendMail({
    from,
    to: lead.email,
    subject: "HSE Provider đã tiếp nhận yêu cầu của bạn",
    text: `Xin chào ${lead.name},\n\nHSE Provider đã nhận được yêu cầu của bạn và sẽ liên hệ xác nhận trong thời gian sớm nhất.\n\nTrân trọng,\nHSE Provider`,
  });
  return "sent" as const;
}
