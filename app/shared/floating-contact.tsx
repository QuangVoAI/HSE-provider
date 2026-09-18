"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./floating-contact.module.css";

const address = "Số 20 Đường ĐX 94, Khu phố 6, phường An Phú, TP Hồ Chí Minh";

export default function FloatingContact() {
  const isEnglish = useSearchParams().get("lang") === "en";
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const update = () => setEditing(document.activeElement?.matches("input, textarea, select, [contenteditable='true']") ?? false);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    return () => {
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
    };
  }, []);

  if (editing) return null;

  return <nav className={styles.contacts} aria-label={isEnglish ? "Quick contact" : "Liên hệ nhanh"}>
    <a className={styles.action} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" aria-label={isEnglish ? "Open office map" : "Mở bản đồ văn phòng"}>
      <img src="/brand-icons/google-maps.svg" alt="" aria-hidden="true" />
    </a>
    <a className={`${styles.action} ${styles.whatsapp}`} href="tel:+84917267397" aria-label={isEnglish ? "Call hotline 0917 267 397" : "Gọi hotline 0917 267 397"}>
      <img src="/brand-icons/whatsapp.svg" alt="" aria-hidden="true" />
    </a>
    <a className={`${styles.action} ${styles.mail}`} href="https://mail.google.com/mail/?view=cm&fs=1&to=cskh%40atld.vn" target="_blank" rel="noopener noreferrer" aria-label={isEnglish ? "Email customer support" : "Gửi email chăm sóc khách hàng"}>
      <img src="/brand-icons/gmail.svg" alt="" aria-hidden="true" />
    </a>
  </nav>;
}
