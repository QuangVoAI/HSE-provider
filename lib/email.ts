import nodemailer from "nodemailer";

import type { Lead } from "@/types/lead";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);
}

function emailShell(content: string) {
  return `<!doctype html>
<html lang="vi">
  <body style="margin:0;padding:0;background:#f2f7fc;font-family:Arial,Helvetica,sans-serif;color:#102a43">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f7fc;padding:28px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #d9e7f4;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(7,54,95,.08)">
          <tr>
            <td style="padding:24px 30px;background:linear-gradient(135deg,#075ba9,#0a78d4);color:#ffffff">
              <div style="font-size:24px;font-weight:800;letter-spacing:.2px">HSE Provider</div>
              <div style="margin-top:5px;font-size:13px;opacity:.9">Awake your safety needs</div>
            </td>
          </tr>
          <tr><td style="padding:30px">${content}</td></tr>
          <tr>
            <td style="padding:18px 30px;background:#082f54;color:#d8e9f8;font-size:12px;line-height:1.6">
              HSE Provider · Hotline: 0917 267 397 · cskh@atld.vn<br>
              Số 20 Đường ĐX 94, Khu phố 6, phường An Phú, TP Hồ Chí Minh
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function detailRow(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 12px;color:#60758a;font-size:13px;border-bottom:1px solid #edf3f8;width:34%;vertical-align:top">${label}</td>
    <td style="padding:10px 12px;color:#102a43;font-size:14px;font-weight:600;border-bottom:1px solid #edf3f8;vertical-align:top">${escapeHtml(value || "-")}</td>
  </tr>`;
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

  const adminHtml = emailShell(`
    <div style="display:inline-block;padding:6px 10px;border-radius:999px;background:#e6f3ff;color:#0069c7;font-size:12px;font-weight:700">YÊU CẦU MỚI</div>
    <h1 style="margin:14px 0 8px;font-size:25px;line-height:1.3;color:#082f54">Khách hàng mới cần tư vấn</h1>
    <p style="margin:0 0 22px;color:#60758a;font-size:14px;line-height:1.6">Vui lòng liên hệ và cập nhật trạng thái xử lý trong thời gian sớm nhất.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dfeaf4;border-radius:12px;border-collapse:separate;overflow:hidden">
      ${detailRow("Họ tên", lead.name)}
      ${detailRow("Email", lead.email)}
      ${detailRow("Điện thoại", lead.phone || "-")}
      ${detailRow("Công ty", lead.company || "-")}
      ${detailRow("Loại yêu cầu", lead.requestType || "-")}
      ${detailRow("Ngày hẹn", lead.preferredDate || "-")}
      ${detailRow("Giờ hẹn", lead.preferredTime || "-")}
      ${detailRow("Nội dung", lead.message || "Không có nội dung bổ sung")}
    </table>
    <p style="margin:22px 0 0;color:#60758a;font-size:12px;line-height:1.6">Bạn có thể trả lời trực tiếp email này để phản hồi khách hàng.</p>
  `);

  const customerHtml = emailShell(`
    <div style="display:inline-block;padding:6px 10px;border-radius:999px;background:#e8f7ef;color:#168653;font-size:12px;font-weight:700">ĐÃ TIẾP NHẬN</div>
    <h1 style="margin:14px 0 12px;font-size:25px;line-height:1.3;color:#082f54">Xin chào ${escapeHtml(lead.name)},</h1>
    <p style="margin:0;color:#405a73;font-size:15px;line-height:1.75">HSE Provider đã nhận được yêu cầu tư vấn của bạn. Đội ngũ phụ trách sẽ kiểm tra thông tin và liên hệ xác nhận trong thời gian sớm nhất.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;background:#f5f9fd;border:1px solid #dfeaf4;border-radius:12px;border-collapse:separate;overflow:hidden">
      ${detailRow("Ngày mong muốn", lead.preferredDate || "-")}
      ${detailRow("Khung giờ", lead.preferredTime || "-")}
      ${detailRow("Nội dung", lead.message || "Không có nội dung bổ sung")}
    </table>
    <p style="margin:22px 0 0;color:#405a73;font-size:14px;line-height:1.7">Nếu cần bổ sung thông tin, bạn chỉ cần trả lời email này hoặc gọi Hotline <strong>0917 267 397</strong>.</p>
    <p style="margin:18px 0 0;color:#082f54;font-size:14px;line-height:1.6"><strong>Trân trọng,<br>HSE Provider</strong></p>
  `);

  await transporter.sendMail({ from, to: admin, replyTo: lead.email, subject, text, html: adminHtml });
  await transporter.sendMail({
    from,
    to: lead.email,
    replyTo: from,
    subject: "HSE Provider đã tiếp nhận yêu cầu của bạn",
    text: `Xin chào ${lead.name},\n\nHSE Provider đã nhận được yêu cầu của bạn và sẽ liên hệ xác nhận trong thời gian sớm nhất.\n\nTrân trọng,\nHSE Provider`,
    html: customerHtml,
  });
  return "sent" as const;
}
