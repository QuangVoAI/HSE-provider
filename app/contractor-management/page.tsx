import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, BriefcaseBusiness, Building2, ChartNoAxesCombined, ClipboardCheck, Database, FileChartColumn, FileText, FileUp, GraduationCap, Lightbulb, Network, Rocket, ScanLine, ShieldCheck, UsersRound } from "lucide-react";
import CustomerHeader from "../customers/customer-header";
import BrandSignature from "../shared/brand-signature";
import SiteFooter from "../shared/site-footer";
import { getSolutionLinks } from "../shared/solution-links";
import ScrollToTop from "../customers/scroll-to-top";
import OverviewCarousel from "../training-management/overview-carousel";
import TrainingExperience from "../training-management/training-experience";
import trainingStyles from "../training-management/training-management.module.css";
import healthStyles from "../health-management/health-management.module.css";
import base from "../customers/customers.module.css";
import styles from "./contractor-management.module.css";

type Locale = "vi" | "en";

export const metadata: Metadata = {
  title: "Contractor Management | HSE Provider",
  description: "Nền tảng quản lý hồ sơ, năng lực, tuân thủ và hoạt động của nhà thầu.",
};

const content = {
  vi: {
    heroTitle: "Quản lý nhà thầu",
    overviewTitle: "Tổng quan giải pháp",
    overviewText: "Phần mềm Quản lý Nhà thầu giúp bạn tối ưu hóa việc quản lý và đảm bảo nhà thầu tuân thủ các quy định an toàn trong suốt quá trình thực hiện dự án. Tự động hóa và tinh gọn các khâu tiếp nhận, giám sát và lưu trữ hồ sơ.",
    overviewBenefits: ["Chuẩn hóa quy trình tiếp nhận nhà thầu", "Kiểm soát điều kiện an toàn và tuân thủ"],
    trial: "Dùng thử miễn phí", contact: "Liên hệ",
    workflowTitle: "Quy trình quản lý nhà thầu",
    workflowSteps: ["Lập kế hoạch công việc", "Phân công người dùng & danh sách nhà thầu", "Nộp hồ sơ trực tuyến", "Cổng đào tạo", "Cấp thẻ nhà thầu", "Kiểm soát ra vào công trường", "Cấp phép làm việc", "Báo cáo dịch vụ"],
    featuresTitle: "Nhóm tính năng",
    features: ["Quản lý hồ sơ tuyển nhà thầu (nhân sự, thiết bị)", "Giám sát tiến độ dự án", "Quản lý hồ sơ/tài liệu an toàn dự án", "Cung cấp tài liệu/hướng dẫn an toàn cho nhà thầu"],
    detailTitle: "Quản lý nhà thầu",
    detailIntro: "Giải pháp của chúng tôi cung cấp một phương pháp tiếp cận toàn diện trong quản lý nhà thầu, đảm bảo hiệu quả và an toàn cho dự án.",
    detailItems: [
      { title: "Quản lý tập trung và minh bạch", text: "Dễ dàng quản lý hồ sơ tuyển nhà thầu, bao gồm cả hồ sơ nhân sự và thiết bị. Đồng thời, việc giám sát tiến độ dự án được thực hiện trực quan, giúp bạn luôn nắm bắt tình hình thực tế." },
      { title: "Đảm bảo an toàn trong suốt dự án", text: "Hệ thống cho phép quản lý toàn bộ tài liệu an toàn dự án và cung cấp hướng dẫn, quy định an toàn chi tiết cho từng nhà thầu; qua đó tối ưu hóa quy trình, giảm thiểu rủi ro và nâng cao hiệu suất làm việc." },
    ],
    valuesTitle: "Giá trị mang lại",
    values: ["Quản lý hồ sơ, tài liệu", "Tối ưu hiệu quả vận hành", "Quản lý rủi ro", "Linh hoạt thích ứng với đa dạng ngành nghề"],
    experienceTitle: "TRẢI NGHIỆM QUẢN LÝ NHÀ THẦU\nTRỰC QUAN VÀ NHẤT QUÁN",
    experienceSlide: "Bảng điều khiển quản lý nhà thầu",
    brandSlogan: "Làm chủ nhà thầu. Làm chủ dự án",
    solutionHeading: "Giải pháp", companyHeading: "Công ty", contactHeading: "Liên hệ",
    footerText: "Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường, giúp doanh nghiệp vận hành an toàn, minh bạch và bền vững hơn.",
    companyLinks: ["Về chúng tôi", "Khách hàng", "Blog & Tin tức", "Liên hệ"],
    certification: "Đã xác thực ISO 27001", terms: "Điều khoản sử dụng", privacy: "Chính sách bảo mật",
    address: "Toà nhà Hà Nam, 26/5 Quốc lộ 13, TP.HCM",
  },
  en: {
    heroTitle: "Contractor Management",
    overviewTitle: "Contractor Management",
    overviewText: "The Contractor Management Module helps you efficiently manage contractors and ensure they meet safety and compliance requirements throughout project delivery. It streamlines contractor onboarding, monitoring and documentation.",
    overviewBenefits: ["Standardized contractor onboarding", "Controlled safety and compliance requirements"],
    trial: "Start free trial", contact: "Contact us",
    workflowTitle: "Contractor Management Workflow",
    workflowSteps: ["Job planning", "Assigned users & contractor list", "Online document submission", "Training portal", "Contractor pass issuance", "Site access control", "Authority to work (ATW)", "Service reporting"],
    featuresTitle: "Features",
    features: ["Manage contractor pre-qualification documents (personnel, equipment)", "Monitor project progress", "Manage project safety documentation", "Provide safety guidelines and instructions for contractors"],
    detailTitle: "Contractor Management",
    detailIntro: "Our solution provides a comprehensive approach to contractor management, ensuring project efficiency and safety.",
    detailItems: [
      { title: "Centralized and transparent management", text: "Manage contractor pre-qualification records, including personnel and equipment information, while monitoring progress to maintain a clear view of actual project conditions." },
      { title: "Safety throughout the project", text: "Centralize safety documentation and provide clear instructions for each contractor to streamline processes, minimize risk and improve work performance." },
    ],
    valuesTitle: "Values",
    values: ["Centralized document management", "Operational efficiency", "Proactive risk management", "Adaptability across industries"],
    experienceTitle: "INTUITIVE CONTRACTOR MANAGEMENT\nFROM DESK TO SITE",
    experienceSlide: "Contractor management dashboard",
    brandSlogan: "Master your contractors. Master your projects",
    solutionHeading: "Solutions", companyHeading: "Company", contactHeading: "Contact",
    footerText: "Health, Safety and Environment management software that helps businesses operate more safely, transparently and sustainably.",
    companyLinks: ["About Us", "Customers", "Blog & News", "Contact"],
    certification: "ISO 27001 Verified", terms: "Terms of Use", privacy: "Privacy Policy",
    address: "Ha Nam Building, 26/5 National Highway 13, HCMC",
  },
} as const;

const workflowIcons = [BriefcaseBusiness, UsersRound, FileUp, GraduationCap, BadgeCheck, ShieldCheck, ClipboardCheck, FileChartColumn] as const;
const featureIcons = [Network, ChartNoAxesCombined, FileText, Lightbulb] as const;
const valueIcons = [ScanLine, Building2, Rocket, Database] as const;
const valueImages = [
  "/assets/contractor-management/value-document-management.png",
  "/assets/contractor-management/value-operational-efficiency.png",
  "/assets/contractor-management/value-risk-management.png",
  "/assets/contractor-management/value-industry-adaptability.png",
] as const;
const asset = (name: string) => `/assets/csms/${name}`;

export default async function ContractorManagementPage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  const locale: Locale = params.lang === "en" ? "en" : "vi";
  const copy = content[locale];
  const query = `?lang=${locale}`;
  const footerSolutionLinks = getSolutionLinks(locale);
  const experienceSlides = [
    { title: copy.experienceSlide, image: "/assets/contractor-management/original-screenshots/contractor-list.png" },
    { title: "Giấy phép làm việc", image: "/assets/contractor-management/original-screenshots/work-permits.png" },
    { title: "Trang tổng quan", image: "/assets/contractor-management/original-screenshots/dashboard.png" },
    { title: "Danh sách công việc", image: "/assets/contractor-management/original-screenshots/work-list.png" },
    { title: "Danh sách nhân viên nhà thầu", image: "/assets/contractor-management/original-screenshots/worker-list.png" },
  ] as const;

  return <div className={`${base.page} ${styles.page}`} lang={locale} id="top"><ScrollToTop />
    <CustomerHeader locale={locale} active="solutions" chrome="csms" localePath="/contractor-management" />
    <main className={base.main}>
      <section className={`${base.hero} ${styles.hero}`} aria-labelledby="contractor-hero-title">
        <img className={styles.heroImage} src="/assets/contractor-management/value-industry-adaptability.png" alt="" />
        <div className={base.heroOverlay}/>
        <h1 className={styles.heroTitle} id="contractor-hero-title">{copy.heroTitle}</h1>
      </section>

      <section className={`${trainingStyles.overview} ${styles.overviewSection}`} aria-labelledby="contractor-solution-overview-title">
        <OverviewCarousel label={copy.heroTitle} images={["/assets/contractor-management/value-industry-adaptability.png","/assets/csms/core-workplace.jpg","/assets/training-management/raw-8.jpg"]}/>
        <div className={trainingStyles.sectionCopy}>
          <h2 id="contractor-solution-overview-title">{copy.overviewTitle}</h2>
          <span className={trainingStyles.overviewRule}/>
          <p>{copy.overviewText}</p>
          <div className={trainingStyles.overviewBenefits}>{copy.overviewBenefits.map(item => <span key={item}><b>✓</b>{item}</span>)}</div>
          <div className={trainingStyles.overviewActions}><Link href={`/contact${query}`}>{copy.trial}</Link><Link href={`/contact${query}`} className={trainingStyles.overviewSecondary}>{copy.contact}</Link></div>
        </div>
      </section>

      <section className={styles.workflow} aria-labelledby="contractor-workflow-title">
        <div className={styles.workflowInner}>
          <h2 id="contractor-workflow-title">{copy.workflowTitle.replace(locale === "vi" ? "quản lý nhà thầu" : "Contractor Management", locale === "vi" ? "quản\u00a0lý\u00a0nhà\u00a0thầu" : "Contractor\u00a0Management")}</h2>
          <div className={styles.workflowStage}>
            <svg className={styles.workflowPath} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className={`${styles.workflowLink} ${styles.link1}`} d="M22 25 H28"/>
              <path className={`${styles.workflowLink} ${styles.link2}`} d="M47 25 H53"/>
              <path className={`${styles.workflowLink} ${styles.link3}`} d="M72 25 H78"/>
              <path className={`${styles.workflowLink} ${styles.link4}`} d="M87.5 42 V58"/>
              <path className={`${styles.workflowLink} ${styles.link5}`} d="M78 75 H72"/>
              <path className={`${styles.workflowLink} ${styles.link6}`} d="M53 75 H47"/>
              <path className={`${styles.workflowLink} ${styles.link7}`} d="M28 75 H22"/>
              <path className={`${styles.workflowLink} ${styles.link8}`} d="M12.5 58 V42"/>
            </svg>
            {Array.from({length:8},(_,index) => <span className={`${styles.flowArrow} ${styles[`arrow${index + 1}`]}`} aria-hidden="true" key={`arrow-${index + 1}`}/>) }
            <ol className={styles.workflowGrid}>{copy.workflowSteps.map((step,index) => {
              const column = index < 4 ? index + 1 : 8 - index;
              const row = index < 4 ? 1 : 2;
              const StepIcon = workflowIcons[index];
              return <li className={styles.workflowCard} style={{gridColumn:column,gridRow:row}} key={step} tabIndex={0}>
                <div className={styles.workflowNode}><StepIcon strokeWidth={1.8}/><b>{String(index + 1).padStart(2,"0")}</b></div>
                <h3>{step}</h3>
              </li>;
            })}</ol>
          </div>
        </div>
      </section>

      <section className={styles.featureStrip} aria-labelledby="contractor-features-title">
        <div className={styles.featureInner}>
          <h2 id="contractor-features-title">{copy.featuresTitle}</h2>
          <div className={styles.featureGrid}>{copy.features.map((feature,index) => {
            const FeatureIcon = featureIcons[index];
            return <article className={styles.featureCard} key={feature}>
              <FeatureIcon aria-hidden="true" strokeWidth={1.8}/>
              <h3>{feature}</h3>
            </article>;
          })}</div>
        </div>
      </section>

      <section className={`${healthStyles.healthDetail} ${styles.detailSection}`} aria-labelledby="contractor-detail-title">
        <div className={`${healthStyles.healthDetailInner} ${styles.detailInner}`}>
          <div className={`${healthStyles.healthDetailHeading} ${styles.detailHeading}`}>
            <h2 id="contractor-detail-title">{copy.detailTitle}</h2>
            <p>{copy.detailIntro}</p>
          </div>
          <div className={`${healthStyles.healthDetailContent} ${styles.detailContent}`}>
            {copy.detailItems.map((item) => <p key={item.title}><strong>{item.title}</strong>{item.text}</p>)}
          </div>
          <div className={`${healthStyles.healthDetailActions} ${styles.detailActions}`}>
            <Link href={`/contact${query}`}>{copy.trial}</Link>
            <Link href={`/contact${query}`}>{copy.contact}</Link>
          </div>
        </div>
      </section>

      <section className={`${healthStyles.features} ${styles.valuesSection}`} aria-labelledby="contractor-values-title">
        <div className={`${healthStyles.container} ${styles.valuesContainer}`}>
          <h2 className={`${healthStyles.featuresCenterTitle} ${styles.valuesTitle}`} id="contractor-values-title">{copy.valuesTitle}</h2>
          <div className={`${healthStyles.featureTimeline} ${styles.valuesGrid}`}>
            <div className={healthStyles.featureTimelineLine}/>
            {copy.values.map((value,index) => {
              const ValueIcon = valueIcons[index];
              return <article className={`${healthStyles.featureCard} ${styles.valueCard}`} key={value} tabIndex={0}>
                <img className={healthStyles.featureCardBg} src={valueImages[index]} alt=""/>
                <div className={healthStyles.featureCardOverlay}/>
                <div className={`${healthStyles.featureCardIcon} ${styles.valueIcon}`}><ValueIcon aria-hidden="true" strokeWidth={1.5}/></div>
                <h3>{value}</h3>
              </article>;
            })}
          </div>
        </div>
      </section>

      <div className={styles.experienceBrandGroup}>
        <TrainingExperience title={copy.experienceTitle.replace(locale === "vi" ? "QUẢN LÝ NHÀ THẦU" : "CONTRACTOR MANAGEMENT", locale === "vi" ? "QUẢN\u00a0LÝ\u00a0NHÀ\u00a0THẦU" : "CONTRACTOR\u00a0MANAGEMENT").replace(locale === "vi" ? "TRỰC QUAN" : "FROM DESK TO SITE", locale === "vi" ? "TRỰC\u00a0QUAN" : "FROM\u00a0DESK\u00a0TO\u00a0SITE").replace(locale === "vi" ? "NHẤT QUÁN" : "INTUITIVE", locale === "vi" ? "NHẤT\u00a0QUÁN" : "INTUITIVE")} slides={experienceSlides} locale={locale}/>

        <BrandSignature locale={locale}/>
      </div>

    </main>

    <SiteFooter locale={locale}/>
  </div>;
}
