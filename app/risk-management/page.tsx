import type { Metadata } from "next";
import Link from "next/link";
import { ChartNoAxesCombined, ChartSpline, ClipboardPenLine, Gauge, ScanSearch, ShieldCheck, Sigma } from "lucide-react";
import CustomerHeader from "../customers/customer-header";
import SiteFooter from "../shared/site-footer";
import SolutionSwitcher from "../shared/solution-switcher";
import { getSolutionLinks } from "../shared/solution-links";
import chrome from "../csms/csms.module.css";
import healthStyles from "../health-management/health-management.module.css";
import OverviewCarousel from "../training-management/overview-carousel";
import TrainingExperience from "../training-management/training-experience";
import styles from "../training-management/training-management.module.css";
import riskStyles from "./risk-management.module.css";
import RiskWorkflow from "./risk-workflow";

type Locale = "vi" | "en";

export const metadata: Metadata = {
  title: "Risk Management",
  description: "Hệ thống nhận diện, đánh giá và kiểm soát rủi ro an toàn lao động toàn diện.",
};

const csmsAsset = (name: string) => `/assets/csms/${name}`;
const riskAsset = (name: string) => `/assets/risk-management/${name}`;

const copy = {
  vi: {
    heroTitle: "Quản lý rủi ro",
    overviewText: "Quản lý rủi ro là một quy trình có hệ thống giúp doanh nghiệp nhận diện, đánh giá và kiểm soát các rủi ro tiềm ẩn có thể ảnh hưởng đến mục tiêu. Quy trình bắt đầu bằng việc thiết lập một công thức đánh giá cụ thể để định lượng mức độ rủi ro, sau đó xây dựng kế hoạch đánh giá chi tiết nhằm nhận diện các mối nguy.",
    checks: ["Chuẩn hóa ma trận đánh giá", "Theo dõi biện pháp kiểm soát"],
    trial: "Đăng ký demo", contactUs: "Liên hệ",
    processTag: "QUY TRÌNH VẬN HÀNH", processTitle: "Hệ thống quản lý rủi ro chuyên nghiệp",
    workflowTitle: "Quy trình quản lý rủi ro",
    workflowDesc: "Chuẩn hóa toàn bộ quá trình nhận diện, đánh giá và kiểm soát rủi ro trên một hệ thống.",
    workflowSteps: ["Thiết lập tiêu chí", "Thiết lập công thức", "Lập kế hoạch đánh giá rủi ro", "Đánh giá rủi ro"],
    matrixLabel: "Theo thang điểm và ma trận",
    controlStep: "Biện pháp kiểm soát mối nguy",
    workflowOutputs: ["Lịch sử đánh giá rủi ro tại nơi làm việc", "Đánh giá đào tạo về các biện pháp kiểm soát rủi ro", "Quản lý dự án đánh giá rủi ro"],
    process: [
      ["Nhận diện mối nguy", "Ghi nhận mối nguy theo khu vực, công việc và nhóm đối tượng"],
      ["Đánh giá rủi ro", "Chấm điểm khả năng xảy ra và mức độ hậu quả theo ma trận"],
      ["Phân loại ưu tiên", "Xác định cấp độ rủi ro và thứ tự cần xử lý"],
      ["Lập biện pháp", "Đề xuất biện pháp kiểm soát theo thứ bậc ưu tiên"],
      ["Phân công xử lý", "Giao trách nhiệm, thời hạn và nguồn lực cho từng hành động"],
      ["Theo dõi tiến độ", "Cập nhật trạng thái và nhắc việc cho các hành động quá hạn"],
      ["Đánh giá lại", "Kiểm tra hiệu lực kiểm soát và lưu vết rủi ro còn lại"],
    ],
    platformTag: "TRẢI NGHIỆM NỀN TẢNG", platformTitle: "Trực quan hóa toàn bộ dữ liệu rủi ro", platformText: "Dữ liệu rủi ro được trình bày tập trung, dễ theo dõi và sẵn sàng phục vụ kiểm tra, báo cáo và ra quyết định.",
    previous: "Trang trước", next: "Trang sau", slides: ["Danh mục mối nguy", "Ma trận rủi ro", "Kế hoạch kiểm soát", "Theo dõi hành động", "Đánh giá rủi ro còn lại", "Báo cáo tổng quan"],
    featureTag: "NHÓM TÍNH NĂNG CHÍNH", featureTitle: "Nhóm tính năng",
    features: [
      ["Xây dựng kế hoạch đánh giá", "Thiết lập kế hoạch đánh giá phù hợp với từng khu vực và hoạt động."],
      ["Theo dõi kết quả thực hiện biện pháp kiểm soát", "Giám sát tiến độ và hiệu lực của từng biện pháp kiểm soát."],
      ["Thiết lập công thức đánh giá", "Cấu hình tiêu chí, thang điểm và công thức đánh giá rủi ro."],
      ["Thống kê và báo cáo kết quả thực hiện", "Tổng hợp dữ liệu và trực quan hóa kết quả theo thời gian thực."],
    ],
    detailTitle: "Quản lý rủi ro",
    detailParagraphs: [
      "Quản lý rủi ro là một quy trình có hệ thống giúp doanh nghiệp nhận diện, đánh giá và kiểm soát các rủi ro tiềm ẩn có thể ảnh hưởng đến mục tiêu. Quy trình này góp phần nâng cao hiệu quả vận hành và khả năng thích ứng trong nhiều ngành nghề.",
      "Để triển khai, quy trình bắt đầu bằng việc thiết lập các công thức đánh giá cụ thể và xây dựng kế hoạch đánh giá chi tiết nhằm nhận diện mối nguy. Sau đó, dựa trên kết quả đánh giá, doanh nghiệp sẽ lập kế hoạch cải tiến và đề xuất các biện pháp kiểm soát phù hợp.",
      "Một phần cốt lõi của quy trình là theo dõi chặt chẽ kết quả thực hiện các biện pháp, sau đó đánh giá hiệu lực của chúng. Toàn bộ quá trình và kết quả được tổng hợp, thống kê và báo cáo, giúp doanh nghiệp liên tục cải tiến và giảm thiểu rủi ro. Các hoạt động này thường được hỗ trợ bởi hệ thống quản lý tài liệu tập trung, giúp lưu trữ và truy cập thông tin hiệu quả, bảo đảm mọi khía cạnh của rủi ro được quản lý chặt chẽ.",
    ],
    valueTag: "GIÁ TRỊ MANG LẠI", valueTitle: "Giá trị mang lại",
    values: [
      ["Nhận diện và đánh giá rủi ro", "Phát hiện, phân tích và ưu tiên các mối nguy cần kiểm soát."],
      ["Triển khai biện pháp kiểm soát", "Chuyển kết quả đánh giá thành hành động kiểm soát cụ thể."],
      ["Theo dõi và đánh giá hiệu lực", "Giám sát kết quả thực hiện và xác nhận hiệu quả của biện pháp."],
      ["Ra quyết định dựa trên dữ liệu", "Sử dụng dữ liệu tập trung để đưa ra quyết định chính xác, kịp thời."],
    ],
    ctaTag: "BẮT ĐẦU NGAY HÔM NAY", ctaTitle: "Kiểm soát tốt rủi ro – Vững bước tương lai", ctaText: "Khám phá giải pháp giúp doanh nghiệp chuẩn hóa đánh giá, kiểm soát hành động và xây dựng môi trường làm việc an toàn bền vững.", consult: "Đăng ký tư vấn", document: "Tài liệu giải pháp",
    solutions: "GIẢI PHÁP", company: "CÔNG TY", contact: "LIÊN HỆ", footer: "Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường tại Việt Nam, giúp doanh nghiệp đạt chuẩn quốc tế.", address: "Số 20 Đường ĐX 94, Khu phố 6, phường An Phú, TP Hồ Chí Minh", terms: "Điều khoản sử dụng", privacy: "Chính sách bảo mật",
  },
  en: {
    heroTitle: "Risk Management",
    overviewText: "Risk management is a systematic process that helps businesses identify, evaluate, and control potential risks that could affect their objectives. This process begins by establishing a specific evaluation formula to quantify the level of risk, followed by creating a detailed assessment plan to identify hazards.",
    checks: ["Standardized risk matrices", "Control action tracking"],
    trial: "Schedule a demo", contactUs: "Contact us",
    processTag: "OPERATING WORKFLOW", processTitle: "Professional risk management system",
    workflowTitle: "Workflow",
    workflowDesc: "Standardize the complete process of identifying, assessing and controlling risk on one system.",
    workflowSteps: ["Establishing criteria", "Establishing a formula", "Risk assessment plan", "Risk assessment"],
    matrixLabel: "By scale and matrix",
    controlStep: "Hazard control methods",
    workflowOutputs: ["History of risk assessment in workplace", "Evaluating training on risk control measures", "Managing a risk assessment project"],
    process: [
      ["Identify hazards", "Record hazards by area, task and exposed group"], ["Assess risk", "Score likelihood and consequence using a consistent matrix"], ["Set priorities", "Classify risk levels and define the order of treatment"], ["Plan controls", "Select controls based on the hierarchy of controls"], ["Assign actions", "Set owners, deadlines and resources for each action"], ["Track progress", "Monitor status and remind owners of overdue actions"], ["Reassess", "Verify control effectiveness and document residual risk"],
    ],
    platformTag: "PLATFORM EXPERIENCE", platformTitle: "Visualize all risk data", platformText: "Keep risk information centralized, easy to monitor and ready for audits, reporting and decisions.",
    previous: "Previous slide", next: "Next slide", slides: ["Hazard register", "Risk matrix", "Control plan", "Action tracking", "Residual risk review", "Overview report"],
    featureTag: "CORE CAPABILITIES", featureTitle: "Features",
    features: [["Develop an evaluation and assessment plan", "Build assessment plans for each area and activity."], ["Monitor control-measure implementation results", "Monitor the progress and effectiveness of every control measure."], ["Set up evaluation and assessment formulas", "Configure criteria, scoring scales and risk formulas."], ["Statistics and reporting of implementation results", "Consolidate data and visualize results in real time."]],
    detailTitle: "Risk Management",
    detailParagraphs: [
      "Risk management is a systematic process that helps businesses identify, evaluate, and control potential risks that could affect their objectives. This process brings about operational efficiency and adaptability across various industries.",
      "To implement this, the process begins by setting up specific evaluation formulas and developing a detailed assessment plan to identify hazards. Subsequently, based on the evaluation results, the business will create an improvement plan and propose appropriate control measures.",
      "A core part of the process is to closely monitor the implementation results of these measures, and then evaluate their effectiveness. The entire process and its outcomes will be compiled in statistics and reported, helping the business to continuously improve and mitigate risks. These activities are often supported by a centralized document management system, which helps store and access information effectively, ensuring that every aspect of risk is managed tightly.",
    ],
    valueTag: "BUSINESS VALUE", valueTitle: "Values",
    values: [["Risk Identification and Evaluation", "Identify, analyze and prioritize hazards requiring control."], ["Implementation of Control Measures", "Turn assessment results into specific control actions."], ["Monitoring and Effectiveness Evaluation", "Monitor implementation and verify control effectiveness."], ["Data-driven Decision Making", "Use centralized data to make accurate, timely decisions."]],
    ctaTag: "GET STARTED TODAY", ctaTitle: "A well-managed risk is a future-proofed business", ctaText: "Explore a solution that standardizes assessments, tracks actions and supports a sustainable safety culture.", consult: "Request consultation", document: "Solution brief",
    solutions: "SOLUTIONS", company: "COMPANY", contact: "CONTACT", footer: "Health, Safety and Environment management software for Vietnamese businesses pursuing international standards.", address: "No. 20 DX 94 Street, Quarter 6, An Phu Ward, Ho Chi Minh City", terms: "Terms of Use", privacy: "Privacy Policy",
  },
} as const;

const slideImages = [
  "original-screenshots/project-create.png",
  "original-screenshots/risk-assessment.png",
  "original-screenshots/assessment-form.png",
  "original-screenshots/formula-builder.png",
  "original-screenshots/control-measures.png",
  "original-screenshots/statistics.png",
];
const featureIcons = [ClipboardPenLine, ShieldCheck, Sigma, ChartSpline] as const;
const valueIcons = [ScanSearch, ShieldCheck, Gauge, ChartNoAxesCombined] as const;
const valueImages = ["risk-identification.png","control-measures.png","effectiveness-monitoring.png","data-driven-decisions.png"].map(name=>`/assets/risk-management/values/${name}`);
export default async function RiskManagementPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale: Locale = params.lang === "en" ? "en" : "vi";
  const t = copy[locale];
  const q = `?lang=${locale}`;
  const slides = t.slides.map((title, index) => ({ title, image: riskAsset(slideImages[index]) }));
  const solutionLinks = getSolutionLinks(locale);
  const companyLinks = locale === "vi" ? ["Về chúng tôi", "Khách hàng", "Blog & Tin tức", "Liên hệ"] : ["About Us", "Customers", "Blog & News", "Contact"];

  return <div className={`${styles.page} hse-module-page`} lang={locale} id="top">
    <CustomerHeader locale={locale} active="solutions" chrome="csms" localePath="/risk-management" />
    <main>
      <section className={`${styles.hero} ${riskStyles.hero} hse-module-hero`} style={{ backgroundImage: "url(/assets/risk-management/hero-risk-assessment.png)" }} aria-label={locale === "vi" ? "Đội ngũ HSE đánh giá mối nguy tại hiện trường" : "HSE team assessing hazards on site"}><OverviewCarousel placement="hero" label={t.heroTitle} autoPlayMs={4500} images={["/assets/risk-management/risk-management-meeting.png","/assets/risk-management/hero-risk-assessment.png",csmsAsset("core-workplace.jpg")]}/><div className={`${styles.heroOverlay} ${riskStyles.heroOverlay}`}/><div className={`${styles.heroCopy} hse-module-hero-title`} style={{ position: "absolute", inset: 0, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}><h1 style={{ width: "100%", maxWidth: 1050, margin: 0, textAlign: "center" }}>{t.heroTitle}</h1></div></section>
      <section className={`${styles.overview} ${riskStyles.overview}`} aria-labelledby="risk-overview-title"><OverviewCarousel label={t.heroTitle} autoPlayMs={4500} images={["/assets/risk-management/risk-management-meeting.png","/assets/risk-management/hero-risk-assessment.png",csmsAsset("core-workplace.jpg")]}/><div className={`${styles.sectionCopy} ${riskStyles.overviewCopy}`}><h2 id="risk-overview-title">{t.heroTitle}</h2><span className={styles.overviewRule}/><p>{t.overviewText}</p><div className={styles.overviewActions}><Link className="hse-primary-action" href={`/contact${q}`}>{t.trial}</Link><Link href={`/contact${q}`} className={styles.overviewSecondary}>{t.contactUs}</Link></div></div></section>
      <RiskWorkflow title={t.workflowTitle} steps={t.workflowSteps} controlStep={t.controlStep} outputs={t.workflowOutputs} />
      <section className={riskStyles.featureStrip} aria-labelledby="risk-features-title"><div className={riskStyles.featureInner}>
        <h2 id="risk-features-title">{t.featureTitle}</h2>
        <div className={riskStyles.featureGrid}>{t.features.map((item,index)=>{const Icon=featureIcons[index];return <article className={riskStyles.featureCard} key={item[0]} tabIndex={0}><Icon aria-hidden="true" strokeWidth={1.7}/><h3>{item[0]}</h3></article>})}</div>
      </div></section>
      <section className={`${healthStyles.healthDetail} ${riskStyles.detailSection}`} aria-labelledby="risk-detail-title">
        <div className={`${healthStyles.healthDetailInner} ${riskStyles.detailInner}`}>
          <div className={healthStyles.healthDetailHeading}><h2 id="risk-detail-title">{t.detailTitle}</h2></div>
          <div className={`${healthStyles.healthDetailContent} ${riskStyles.detailContent}`}>{t.detailParagraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div>
          <div className={healthStyles.healthDetailActions}><Link href={`/contact${q}`}>{t.trial}</Link><Link href={`/contact${q}`}>{t.contactUs}</Link></div>
        </div>
      </section>
      <section className={`${healthStyles.features} ${riskStyles.valuesSection}`} aria-labelledby="risk-values-title"><div className={`${healthStyles.container} ${riskStyles.valuesContainer}`}>
        <h2 className={`${healthStyles.featuresCenterTitle} ${riskStyles.valuesTitle}`} id="risk-values-title">{t.valueTitle}</h2>
        <div className={`${healthStyles.featureTimeline} ${riskStyles.valuesGrid}`}>
          {t.values.map((value,index)=>{const Icon=valueIcons[index];return <article className={`${healthStyles.featureCard} ${riskStyles.valueCard}`} key={value[0]} tabIndex={0}>
            <img className={healthStyles.featureCardBg} src={valueImages[index]} alt=""/>
            <div className={healthStyles.featureCardOverlay}/>
            <div className={`${healthStyles.featureCardIcon} ${riskStyles.valueIcon}`}><Icon aria-hidden="true" strokeWidth={1.5}/></div>
            <h3>{value[0]}</h3>
          </article>})}
        </div>
      </div></section>
      <div className={riskStyles.experienceBrandGroup}>
        <TrainingExperience title={locale === "vi" ? "TRẢI NGHIỆM QUẢN\u00a0LÝ\u00a0RỦI\u00a0RO TRỰC\u00a0QUAN VÀ NHẤT\u00a0QUÁN" : "INTUITIVE\u00a0AND\u00a0CONSISTENT RISK\u00a0MANAGEMENT\u00a0EXPERIENCE"} slides={slides} locale={locale}/>
      </div>
      <SolutionSwitcher locale={locale} currentPath="/risk-management" />
    </main>
    <SiteFooter locale={locale}/>
  </div>;
}
