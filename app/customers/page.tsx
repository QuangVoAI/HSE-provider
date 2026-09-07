import type { Metadata } from "next";
import Link from "next/link";
import ScrollToTop from "./scroll-to-top";
import CustomerHeader from "./customer-header";
import BrandSignature from "../shared/brand-signature";
import SiteFooter from "../shared/site-footer";
import { getSolutionLinks } from "../shared/solution-links";
import styles from "./customers.module.css";

type Locale = "vi" | "en";

export const metadata: Metadata = {
  title: "Our Customers | HSE Provider",
  description: "The organisations partnering with HSE Provider to build safer, more sustainable workplaces.",
};

const customers = [
  ["SCG", "customer-scg.png"], ["TEKCOM", "customer-tekcom.png"], ["Heineken", "customer-heineken.png"],
  ["Savills", "customer-savills.png"], ["Ajinomoto", "customer-ajinomoto.png"], ["Saint-Gobain", "customer-saint-gobain.png"],
  ["First Solar", "customer-first-solar.png"], ["De Heus", "customer-de-heus.png"], ["Suntory PepsiCo", "customer-suntory-pepsico.png"],
  ["Bosch", "customer-bosch.png"], ["Fujikura", "customer-fujikura.png"], ["FrieslandCampina", "customer-frieslandcampina.png"],
] as const;

const testimonials = [
  {
    company: "Saint-Gobain",
    image: "/assets/customers/customer-saint-gobain-transparent.png",
    quote: "Your effort and commitment toward the day was exceptional and this was really affected in the quality of the whole event. Clearly excellent teamwork, result focus and good creativity were competencies that you demonstrated very positively in reaching this achievement.",
    author: "Craig Chamber",
    role: "Managing Director of Saint-Gobain VN",
    theme: "saint",
  },
  {
    company: "SABECO",
    image: "/assets/customers/customer-sabeco-hd.png",
    quote: "Thank you, Mr. Nhan, for sharing your very practical knowledge about labor safety. The method of teaching is direct and easy to understand, making us, the employees, feel very comfortable and eager to participate in the training.",
    author: "Mr. Ha",
    role: "SABECO",
    theme: "sabeco",
  },
  {
    company: "BlueScope Lysaght",
    image: "/assets/customers/customer-bluescope-transparent.png",
    quote: "I highly appreciate your company's development strategy and wish the company continued growth.",
    author: "Mr. Anh Hai",
    role: "VP",
    theme: "bluescope",
  },
] as const;

const translations = {
  vi: {
    address: "Toà nhà Hà Nam, 26/5 Quốc lộ 13, TP.HCM", language: "Ngôn ngữ", login: "Đăng nhập",
    overview: "Tổng quan", solutions: "Giải pháp", customers: "Khách hàng", contact: "Liên hệ", demo: "Đăng ký demo",
    eyebrow: "Khách hàng HSE Provider", hero: "Đồng hành cùng doanh nghiệp kiến tạo môi trường làm việc", accent: "an toàn",
    heroText: "HSE Provider đồng hành cùng doanh nghiệp trong việc xây dựng môi trường làm việc an toàn và phát triển bền vững.",
    shareTitle: "Khách hàng chia sẻ", shareText: "Lắng nghe những trải nghiệm thực tế từ các đối tác chiến lược đã tin tưởng sử dụng giải pháp của chúng tôi.",
    logoTitle: "Khách hàng của chúng tôi", solutionHeading: "Giải pháp", companyHeading: "Công ty", contactHeading: "Liên hệ",
    footerText: "Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường, giúp doanh nghiệp vận hành an toàn, minh bạch và bền vững hơn.",
    companyLinks: ["Về chúng tôi", "Khách hàng", "Blog & Tin tức", "Liên hệ"],
    certification: "Đã xác thực ISO 27001", terms: "Điều khoản sử dụng", privacy: "Chính sách bảo mật",
  },
  en: {
    address: "Ha Nam Building, 26/5 National Highway 13, HCMC", language: "Language", login: "Log in",
    overview: "Overview", solutions: "Solutions", customers: "Customers", contact: "Contact", demo: "Book a demo",
    eyebrow: "HSE Provider customers", hero: "Partnering with businesses to create", accent: "safer workplaces",
    heroText: "HSE Provider works alongside businesses to build safer workplaces and support sustainable growth.",
    shareTitle: "What our customers say", shareText: "Hear directly from strategic partners who trust our solutions in their operations.",
    logoTitle: "Our Customers", solutionHeading: "Solutions", companyHeading: "Company", contactHeading: "Contact",
    footerText: "Health, Safety and Environment management software that helps businesses operate more safely, transparently and sustainably.",
    companyLinks: ["About Us", "Customers", "Blog & News", "Contact"],
    certification: "ISO 27001 Verified", terms: "Terms of Use", privacy: "Privacy Policy",
  },
} as const;

const csms = (name: string) => `/assets/csms/${name}`;

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const locale: Locale = params.lang === "en" ? "en" : "vi";
  const copy = translations[locale];
  const query = `?lang=${locale}`;
  const footerSolutionLinks = getSolutionLinks(locale);

  return <div className={styles.page} lang={locale} id="top"><ScrollToTop />
    <CustomerHeader locale={locale} chrome="csms" localePath="/customers" />

    <main className={styles.main}>
      <section className={styles.hero} aria-labelledby="customers-hero-title">
        <img src="/assets/customers/customer-handshake-hero.png" alt="" />
        <div className={styles.heroOverlay} />
        <h1 id="customers-hero-title">{copy.logoTitle}</h1>
      </section>

      <section className={styles.testimonials} aria-labelledby="customer-share-title">
        <div className={styles.sectionHeading}><h2 id="customer-share-title">{copy.shareTitle}</h2><p>{copy.shareText}</p></div>
        <div className={styles.testimonialStack}>
          {testimonials.map((testimonial) => (
            <article className={styles.testimonialSection} data-theme={testimonial.theme} key={testimonial.company}>
              <div className={styles.testimonialCopy}>
                <span className={styles.quoteMark} aria-hidden="true">“</span>
                <blockquote>{testimonial.quote}</blockquote>
                <div className={styles.author}>
                  <span className={styles.authorLine} />
                  <p><strong>{testimonial.author}</strong><span>{testimonial.role}</span></p>
                </div>
              </div>
              <div className={`${styles.testimonialBrand} ${styles[testimonial.theme]}`}>
                <img src={testimonial.image} alt={testimonial.company} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.logoWall} aria-labelledby="customer-logo-title"><div className={styles.logoWallInner}><h2 id="customer-logo-title">{copy.logoTitle}</h2><div className={styles.logoGrid}>
        {customers.map(([name, image]) => <div className={styles.logoTile} data-logo={name.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={name}><img src={csms(image)} alt={name} /></div>)}
      </div></div></section>

      <BrandSignature locale={locale}/>
    </main>

    <SiteFooter locale={locale}/>
  </div>;
}
