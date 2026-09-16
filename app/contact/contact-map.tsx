import styles from "./contact-map.module.css";

const officeMapUrl = `https://www.google.com/maps?q=${encodeURIComponent("Số 20 Đường ĐX 94, Khu phố 6, phường An Phú, TP Hồ Chí Minh")}&z=17&output=embed`;

export default function ContactMap({ locale }: { locale: "vi" | "en" }) {
  const isVi = locale === "vi";

  return (
    <section
      className={styles.band}
      aria-label={isVi ? "Bản đồ trụ sở HSE Provider" : "HSE Provider head office map"}
    >
      <div className={styles.section}>
        <header className={styles.heading}>
          <h2>
            {isVi
              ? "Ghé thăm văn phòng để gặp gỡ và trao đổi trực tiếp"
              : "Visit our office for in-person meetings and consultations"}
          </h2>
        </header>

        <div className={styles.canvas}>
          <iframe
            title={isVi ? "Bản đồ trụ sở HSE Provider" : "HSE Provider head office map"}
            src={officeMapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
