import styles from "./brand-signature.module.css";

type Locale = "vi" | "en";

export default function BrandSignature({ locale }: { locale: Locale }) {
  const label = locale === "vi" ? "Thương hiệu HSE Provider" : "HSE Provider brand";
  return <section className={styles.section} id="brand-signature" aria-label={label}>
    <div className={styles.backdrop}/>
    <div className={styles.content}>
    <img src="/assets/shared/hse-provider-logo-color.png" alt="HSE Provider" loading="lazy" decoding="async"/>
    </div>
  </section>;
}
