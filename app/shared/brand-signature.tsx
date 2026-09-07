import styles from "./brand-signature.module.css";

type Locale = "vi" | "en";

export default function BrandSignature({ locale }: { locale: Locale }) {
  const label = locale === "vi" ? "Thương hiệu HSE Provider" : "HSE Provider brand";
  return <section className={styles.section} aria-label={label}>
    <div className={styles.backdrop}/>
    <div className={styles.content}>
      <img src="/assets/contractor-management/hse-provider-brand.png" alt="HSE Provider"/>
    </div>
  </section>;
}
