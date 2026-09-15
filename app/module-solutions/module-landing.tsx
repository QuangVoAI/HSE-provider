import Link from "next/link";
import {
  Bell,
  CalendarDays,
  Copy,
  Database,
  Gauge,
  LineChart,
  ListTodo,
  MapPinned,
  MessageSquareText,
  OctagonAlert,
  QrCode,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import CustomerHeader from "../customers/customer-header";
import ScrollToTop from "../customers/scroll-to-top";
import BrandSignature from "../shared/brand-signature";
import SiteFooter from "../shared/site-footer";
import SolutionSwitcher from "../shared/solution-switcher";
import { getSolutionLinks } from "../shared/solution-links";
import TrainingExperience from "../training-management/training-experience";
import OverviewCarousel from "../training-management/overview-carousel";
import ModuleWorkflow from "./module-workflow";
import EquipmentWorkflow from "./equipment-workflow";
import EnvironmentalWorkflow from "./environmental-workflow";
import chrome from "../csms/csms.module.css";
import trainingStyles from "../training-management/training-management.module.css";
import riskStyles from "../risk-management/risk-management.module.css";
import healthStyles from "../health-management/health-management.module.css";
import styles from "./module-landing.module.css";
import type { Locale, ModulePageConfig } from "./module-data";

const featureIcons = [Database, MapPinned, QrCode, LineChart] as const;
const safetyFeatureIcons = [OctagonAlert, MessageSquareText, ListTodo, TrendingUp] as const;
const equipmentFeatureIcons = [Copy, CalendarDays, Scale, Bell] as const;
const valueIcons = [ShieldCheck, Gauge, UsersRound, Sparkles] as const;
const csmsAsset = (name: string) => `/assets/csms/${name}`;

const footerCopy = {
  vi: {
    solutions: "GIẢI PHÁP",
    company: "CÔNG TY",
    contact: "LIÊN HỆ",
    footer: "Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường, giúp doanh nghiệp vận hành an toàn, minh bạch và bền vững hơn.",
    companyLinks: ["Về chúng tôi", "Khách hàng", "Blog & Tin tức", "Liên hệ"],
    address: "Tòa nhà Hà Nam, 26/5 Quốc lộ 13, Khu phố Tây, Phường Lái Thiêu, TP.HCM",
    terms: "Điều khoản sử dụng",
    privacy: "Chính sách bảo mật",
  },
  en: {
    solutions: "SOLUTIONS",
    company: "COMPANY",
    contact: "CONTACT",
    footer: "Health, Safety and Environment management software that helps businesses operate more safely, transparently and sustainably.",
    companyLinks: ["About Us", "Customers", "Blog & News", "Contact"],
    address: "Ha Nam Building, 26/5 National Highway 13, Tay Quarter, Lai Thieu Ward, Ho Chi Minh City",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
  },
} as const;

export default function ModuleLanding({ config, locale }: { config: ModulePageConfig; locale: Locale }) {
  const copy = config.copy[locale];
  const footer = footerCopy[locale];
  const footerSolutionLinks = getSolutionLinks(locale);
  const query = `?lang=${locale}`;
  // Keep headings breakable. Non-breaking phrase replacements made Safari
  // create unnecessary or awkward line breaks in otherwise wide columns.
  const balancedTitle = copy.title;
  const keepTitleOnOneLine = config.slug === "safety-observation";
  const overviewHeading = config.slug === "safety-observation"
    ? (locale === "vi" ? "Báo cáo quan sát an toàn" : "Safety Observation & Reporting")
    : copy.title;
  const usePreferredOverviewLayout = config.slug === "legal-compliance" || config.slug === "environmental-management" || config.slug === "safety-culture";
  const workflowNote = config.slug === "legal-compliance"
    ? undefined
    : config.slug === "safety-observation"
      ? (locale === "vi" ? "Truy cập bằng đường dẫn trực tiếp hoặc mã QR để xác định chính xác phòng ban và khu vực làm việc." : "Use a direct link or QR code to identify the exact department and work area.")
      : copy.workflowIntro;
  const equipmentWorkflowNote = locale === "vi"
    ? "Hệ thống hiển thị cấu trúc phân cấp: Nhà máy → Máy móc/Thiết bị"
    : "The system displays a hierarchical structure: Plant → Machinery/Equipment";
  const environmentalWorkflowDescriptions = locale === "vi"
    ? [
        "Thiết lập các khu vực cần thực hiện đo kiểm môi trường lao động.",
        "Định nghĩa tiêu chí và thông số cần đo theo phạm vi áp dụng.",
        "Gán bộ tiêu chí phù hợp cho từng khu vực quan trắc.",
        "Lập lịch, phân công và theo dõi kế hoạch quan trắc.",
        "Ghi nhận và lưu trữ tập trung kết quả quan trắc.",
      ]
    : [
        "Set up the work areas that require occupational environment monitoring.",
        "Define the criteria and parameters required for the applicable scope.",
        "Assign the appropriate monitoring metrics to each work area.",
        "Schedule, assign and track the monitoring plan.",
        "Record and centralize environmental monitoring results.",
      ];
  const valueImagesBySlug: Record<string, string[]> = {
    "environmental-management": [
      "/assets/module-solutions/environmental-value-air-quality.png",
      "/assets/module-solutions/environmental-value-field-monitoring.png",
      "/assets/module-solutions/environmental-value-data.png",
      "/assets/module-solutions/environmental-value-prevention.png",
    ],
    "safety-observation": [
      "/assets/risk-management/values/risk-identification.png",
      "/assets/risk-management/values/control-measures.png",
      "/assets/risk-management/risk-management-meeting.png",
      "/assets/risk-management/values/data-driven-decisions.png",
    ],
    "legal-compliance": [
      "/assets/module-solutions/legal-value-scope.png",
      "/assets/module-solutions/legal-value-standardization.png",
      "/assets/module-solutions/legal-value-gap-analysis.png",
      "/assets/module-solutions/legal-value-trend-analysis.png",
    ],
  };
  const valueImages = valueImagesBySlug[config.slug] ?? [config.heroImage, ...config.overviewImages, "/assets/risk-management/values/data-driven-decisions.png"]
    .filter((image, index, images) => images.indexOf(image) === index)
    .slice(0, 4);
  const safetyValueLabels = locale === "vi"
    ? ["Chủ động phòng ngừa", "Cải tiến liên tục", "Nâng cao ý thức an toàn", "Xử lý minh bạch, hiệu quả"]
    : ["Proactive prevention", "Continuous improvement", "Stronger safety awareness", "Transparent, efficient resolution"];
  const experienceImages = config.experienceImages ?? [config.icon, "/assets/csms/csms-dashboard.png"];
  const slides = experienceImages.map((image, index) => ({
    title: locale === "vi" ? `Màn hình trải nghiệm ${index + 1}` : `User experience screen ${index + 1}`,
    image,
  }));
  return <div className={`${styles.page} ${trainingStyles.page} hse-module-page`} lang={locale} id="top">
    <ScrollToTop />
    <CustomerHeader locale={locale} active="solutions" chrome="csms" localePath={`/${config.slug}`} />
    <main>
      <section className={`${trainingStyles.hero} ${riskStyles.hero} ${styles.moduleHero} hse-module-hero`} style={{ backgroundImage: `url(${config.heroImage})` }} aria-labelledby={`${config.slug}-title`}>
        <OverviewCarousel placement="hero" images={[config.heroImage, ...config.overviewImages.filter(image => image !== config.heroImage)]} label={copy.title} autoPlayMs={4500}/>
        <div className={`${trainingStyles.heroOverlay} ${riskStyles.heroOverlay}`}/>
        <div className={`${trainingStyles.heroCopy} hse-module-hero-title`} style={{ position:"absolute", inset:0, width:"100%", display:"flex", alignItems:"center", justifyContent:"center", padding:"0 24px", textAlign:"center" }}>
          <h1 id={`${config.slug}-title`} className={`${keepTitleOnOneLine ? styles.singleLineHeroTitle : ""} ${config.slug === "legal-compliance" ? styles.legalHeroTitle : ""}`} style={{ width:"100%", maxWidth:1050, margin:0, textAlign:"center" }}>{balancedTitle}</h1>
        </div>
      </section>

      <section className={`${trainingStyles.overview} ${riskStyles.overview} ${styles.moduleOverview} ${usePreferredOverviewLayout ? styles.legalOverview : ""} ${config.slug === "safety-culture" ? styles.safetyCultureOverview : ""}`} aria-labelledby={`${config.slug}-overview-title`}>
        <OverviewCarousel images={[...config.overviewImages]} label={copy.title} autoPlayMs={4500}/>
        <div className={`${trainingStyles.sectionCopy} ${usePreferredOverviewLayout ? styles.legalOverviewCopy : ""} ${config.slug === "safety-culture" ? styles.safetyCultureOverviewCopy : ""}`}>
          <h2 id={`${config.slug}-overview-title`} className={styles.moduleOverviewTitle}>{overviewHeading}</h2>
          <span className={trainingStyles.overviewRule}/>
          <p>{copy.overview}</p>
          {copy.overviewContinuation ? <p className={`${styles.overviewContinuation} ${config.slug === "legal-compliance" ? styles.legalOverviewContinuation : ""}`}>{copy.overviewContinuation}</p> : null}
          <div className={trainingStyles.overviewBenefits}>{copy.benefits.map(item => <span key={item}><b>✓</b>{item}</span>)}</div>
          <div className={trainingStyles.overviewActions}><Link className="hse-primary-action" href={`/contact${query}`}>{copy.demo}</Link><Link href={`/contact${query}`} className={trainingStyles.overviewSecondary}>{copy.contact}</Link></div>
        </div>
      </section>

      <div id="workflow">
        {config.slug === "equipment-management"
          ? <EquipmentWorkflow title={copy.workflowTitle} steps={copy.workflow} note={equipmentWorkflowNote}/>
          : config.slug === "environmental-management"
            ? <EnvironmentalWorkflow title={copy.workflowTitle} steps={copy.workflow} descriptions={environmentalWorkflowDescriptions}/>
          : <ModuleWorkflow title={copy.workflowTitle} steps={copy.workflow} note={workflowNote}/>}
      </div>

      <section className={riskStyles.featureStrip} aria-labelledby={`${config.slug}-features-title`}>
        <div className={riskStyles.featureInner}>
          <h2 id={`${config.slug}-features-title`}>{copy.featuresTitle}</h2>
          <div className={riskStyles.featureGrid}>{copy.features.map((feature,index) => {
          const Icon = (config.slug === "safety-observation" ? safetyFeatureIcons : config.slug === "equipment-management" ? equipmentFeatureIcons : featureIcons)[index];
          return <article className={riskStyles.featureCard} key={feature.title} tabIndex={0}><Icon aria-hidden="true" strokeWidth={1.7}/><h3>{feature.title}</h3></article>;
          })}</div>
        </div>
      </section>

      <section className={`${healthStyles.healthDetail} ${riskStyles.detailSection} ${config.slug === "equipment-management" ? styles.equipmentDetailSection : ""}`} aria-labelledby={`${config.slug}-detail-title`}>
        <div className={`${healthStyles.healthDetailInner} ${riskStyles.detailInner}`}>
          <div className={healthStyles.healthDetailHeading}><h2 id={`${config.slug}-detail-title`}>{copy.detailTitle}</h2></div>
          <div className={`${healthStyles.healthDetailContent} ${riskStyles.detailContent}`}>{copy.detail.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className={healthStyles.healthDetailActions}><Link href={`/contact${query}`}>{copy.demo}</Link><Link href={`/contact${query}`}>{copy.contact}</Link></div>
        </div>
      </section>

      <section className={`${healthStyles.features} ${riskStyles.valuesSection} ${styles.moduleValues}`} aria-labelledby={`${config.slug}-values-title`}>
        <div className={`${healthStyles.container} ${riskStyles.valuesContainer}`}>
          <h2 className={`${healthStyles.featuresCenterTitle} ${riskStyles.valuesTitle}`} id={`${config.slug}-values-title`}>{copy.valuesTitle}</h2>
          <div className={`${healthStyles.featureTimeline} ${riskStyles.valuesGrid}`}>{copy.values.map((value,index) => {
          const Icon = valueIcons[index];
          return <article className={`${healthStyles.featureCard} ${riskStyles.valueCard}`} key={value.title} tabIndex={0}>
            <img className={healthStyles.featureCardBg} src={valueImages[index]} alt="" loading="lazy" decoding="async"/>
            <div className={healthStyles.featureCardOverlay}/>
            <div className={`${healthStyles.featureCardIcon} ${riskStyles.valueIcon}`}><Icon aria-hidden="true" strokeWidth={1.5}/></div>
            <h3>{config.slug === "safety-observation" ? safetyValueLabels[index] : value.title}</h3>
          </article>;
          })}</div>
        </div>
      </section>

      <div className={styles.experienceGroup}>
        <TrainingExperience title={copy.experienceTitle} slides={slides} locale={locale}/>
        <BrandSignature locale={locale}/>
      </div>
      <SolutionSwitcher locale={locale} currentPath={`/${config.slug}`} />
    </main>

    <SiteFooter locale={locale}/>
  </div>;
}
