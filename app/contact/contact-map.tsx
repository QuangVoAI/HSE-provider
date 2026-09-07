import styles from "./contact-map.module.css";

const officeMapUrl =
  "https://www.google.com/maps?q=HSE%20Provider%20B%C3%ACnh%20D%C6%B0%C6%A1ng&ll=10.8773419,106.7000569&z=18&output=embed";

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
