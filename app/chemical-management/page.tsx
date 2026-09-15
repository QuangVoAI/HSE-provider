import type { Metadata } from "next";
import Link from "next/link";
import CustomerHeader from "../customers/customer-header";
import ScrollToTop from "../customers/scroll-to-top";
import BrandSignature from "../shared/brand-signature";
import SiteFooter from "../shared/site-footer";
import SolutionSwitcher from "../shared/solution-switcher";
import { getSolutionLinks } from "../shared/solution-links";
import chrome from "../csms/csms.module.css";
import trainingStyles from "../training-management/training-management.module.css";
import riskStyles from "../risk-management/risk-management.module.css";
import styles from "./chemical-management.module.css";
import ConstructionReveal from "./construction-reveal";

type Locale = "vi" | "en";

export const metadata: Metadata = {
  title: "Chemical & Radiation Management | HSE Provider",
  description: "Phân hệ Quản lý hóa chất & phóng xạ của HSE Provider đang được hoàn thiện.",
};

const asset = (name: string) => `/assets/csms/${name}`;

const content = {
  vi: {
    title: "Quản lý hóa chất & phóng xạ",
    comingTitle: "Giải pháp sắp ra mắt",
    comingText: "Vui lòng quay lại trong thời gian tới để cập nhật những thông tin mới nhất của Phân hệ Quản lý hóa chất & phóng xạ",
    solutions: "GIẢI PHÁP", company: "CÔNG TY", contact: "LIÊN HỆ",
    footer: "Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường hàng đầu Việt Nam, giúp doanh nghiệp đạt chuẩn quốc tế.",
    address: "Tòa nhà Hà Nam, 26/5 Quốc lộ 13, Khu phố Tây, Phường Lái Thiêu, TP.HCM",
    terms: "Điều khoản sử dụng", privacy: "Chính sách bảo mật",
    companyLinks: ["Về chúng tôi", "Khách hàng", "Blog & Tin tức", "Liên hệ"],
  },
  en: {
    title: "Chemical & Radiation Management",
    comingTitle: "Solution coming soon",
    comingText: "We are working hard to complete the Chemical & Radiation Management module. Please check back soon for the latest updates.",
    solutions: "SOLUTIONS", company: "COMPANY", contact: "CONTACT",
    footer: "A leading Health, Safety and Environment management software solution helping businesses pursue international standards.",
    address: "Ha Nam Building, 26/5 National Highway 13, Tay Quarter, Lai Thieu Ward, Ho Chi Minh City",
    terms: "Terms of Use", privacy: "Privacy Policy",
    companyLinks: ["About Us", "Customers", "Blog & News", "Contact"],
  },
} as const;

export default async function ChemicalManagementPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale: Locale = params.lang === "en" ? "en" : "vi";
  const t = content[locale];
  const query = `?lang=${locale}`;
  const footerSolutionLinks = getSolutionLinks(locale);

  return <div className={`${trainingStyles.page} ${styles.page} hse-module-page`} lang={locale} id="top">
    <ScrollToTop />
    <CustomerHeader locale={locale} active="solutions" chrome="csms" localePath="/chemical-management" />
    <main>
      <div className={styles.constructionScene}>
        <section className={`${trainingStyles.hero} ${riskStyles.hero} ${styles.heroElevated} hse-module-hero`} style={{backgroundImage:"url(/assets/chemical-management/chemical-radiation-hero.png)"}} aria-label={t.title}>
          <div className={`${trainingStyles.heroOverlay} ${riskStyles.heroOverlay}`}/>
          <div className={`${trainingStyles.heroCopy} hse-module-hero-title`} style={{position:"absolute",inset:0,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px",textAlign:"center"}}><h1 style={{width:"100%",maxWidth:1150,margin:0,textAlign:"center"}}>{t.title}</h1></div>
        </section>

        <ConstructionReveal>
          <div className={styles.brandBadge}>
            <img src="/assets/csms/figma-vn/logo-header.png" alt="HSE Provider"/>
          </div>
          <h2 id="chemical-coming-title">{t.comingTitle}</h2>
          <span aria-hidden="true"/>
          <p>{t.comingText}</p>
        </ConstructionReveal>

        <div className={styles.brandGroup}><BrandSignature locale={locale}/></div>
      </div>
      <SolutionSwitcher locale={locale} currentPath="/chemical-management" />
    </main>

    <SiteFooter locale={locale}/>
  </div>;
}
