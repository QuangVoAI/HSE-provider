"use client";

import { type FormEvent, useState } from "react";
import { VIETNAM_MOBILE_PATTERN } from "@/lib/lead-validation";
import styles from "./contact.module.css";

export default function ContactForm({ locale }: { locale: "vi" | "en" }) {
  const [sent, setSent] = useState(false);
  const [demoSubmission, setDemoSubmission] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const vi = locale === "vi";
  const now = new Date();
  const minimumDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale, requestType: "consultation", source: "contact-page" }),
      });
      if (!response.ok) throw new Error("lead_failed");
      const result = await response.json() as { demo?: boolean };
      setDemoSubmission(Boolean(result.demo));
      setSent(true);
      form.reset();
    } catch {
      setError(vi ? "Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau." : "We could not send your request. Please try again.");
    } finally {
      setSending(false);
    }
  };
  return <form className={styles.form} onSubmit={submit}>
    <div className={styles.formHeading}>
      <h3>{vi ? "Gửi yêu cầu tư vấn" : "Send an enquiry"}</h3>
      <p>{vi ? "Chúng tôi sẽ phản hồi thông tin của bạn trong thời gian sớm nhất." : "We will respond to your enquiry as soon as possible."}</p>
    </div>
    <div className={styles.formRow}>
      <label><span className={styles.labelText}>{vi ? "Họ và tên" : "Full name"}<em>*</em></span><input required minLength={2} maxLength={100} name="name" autoComplete="name" placeholder={vi ? "Nhập họ và tên" : "Enter your name"} /></label>
      <label><span className={styles.labelText}>{vi ? "Tên doanh nghiệp" : "Company"}</span><input maxLength={150} name="company" autoComplete="organization" placeholder={vi ? "Tên công ty của bạn" : "Your company"} /></label>
    </div>
    <div className={styles.formRow}>
      <label><span className={styles.labelText}>{vi ? "Email công việc" : "Work email"}<em>*</em></span><input required maxLength={254} name="email" autoComplete="email" type="email" placeholder="name@company.com" /></label>
      <label><span className={styles.labelText}>{vi ? "Số điện thoại" : "Phone number"}<em>*</em></span><input required name="phone" autoComplete="tel" type="tel" inputMode="tel" pattern={VIETNAM_MOBILE_PATTERN} title={vi ? "Nhập số di động Việt Nam, ví dụ 0917 267 397 hoặc +84 917 267 397" : "Enter a Vietnamese mobile number, for example 0917 267 397 or +84 917 267 397"} placeholder={vi ? "0917 267 397" : "0917 267 397"} /></label>
    </div>
    <div className={`${styles.formRow} ${styles.scheduleRow}`}>
      <label><span className={styles.labelText}>{vi ? "Ngày muốn tư vấn" : "Preferred date"}</span><input name="preferredDate" type="date" min={minimumDate} /></label>
      <label><span className={styles.labelText}>{vi ? "Khung giờ mong muốn" : "Preferred time"}</span><input name="preferredTime" type="time" /></label>
    </div>
    <label><span className={styles.labelText}>{vi ? "Nội dung trao đổi" : "How can we help?"}<em>*</em></span><textarea required minLength={5} maxLength={2000} name="message" placeholder={vi ? "Vui lòng mô tả nhu cầu của bạn..." : "Tell us about your needs..."} /></label>
    <div className={styles.formAction}>
      <button type="submit" disabled={sending}><span>{sending ? (vi ? "ĐANG GỬI..." : "SENDING...") : (vi ? "GỬI YÊU CẦU" : "SEND REQUEST")}</span><b aria-hidden="true">→</b></button>
    </div>
    {sent && <p className={styles.success} role="status">{demoSubmission
      ? (vi ? "Đã gửi thử thành công. Đây là bản demo nên thông tin không được lưu." : "Demo submission successful. Your information was not stored.")
      : (vi ? "Cảm ơn bạn. HSE Provider sẽ liên hệ trong thời gian sớm nhất." : "Thank you. HSE Provider will contact you shortly.")}</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
  </form>;
}
