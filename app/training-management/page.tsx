import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, CalendarClock, ChartNoAxesCombined, Gauge, Scale, ShieldCheck, UsersRound } from "lucide-react";
import CustomerHeader from "../customers/customer-header";
import BrandSignature from "../shared/brand-signature";
import SiteFooter from "../shared/site-footer";
import { getSolutionLinks } from "../shared/solution-links";
import chrome from "../csms/csms.module.css";
import OverviewCarousel from "./overview-carousel";
import TrainingExperience from "./training-experience";
import WorkflowSection from "./workflow-section";
import healthStyles from "../health-management/health-management.module.css";
import riskStyles from "../risk-management/risk-management.module.css";
import styles from "./training-management.module.css";

type Locale = "vi" | "en";
export const metadata: Metadata = { title: "Training Management | HSE Provider", description: "Hệ thống quản lý đào tạo an toàn, vệ sinh lao động toàn diện." };
const csmsAsset = (name: string) => `/assets/csms/${name}`;
const trainingAsset = (name: string) => `/assets/training-management/${name}`;

const copy = {
  vi: {
    heroTop:"Quản lý huấn luyện", heroAccent:"An toàn", heroBottom:"Vệ sinh lao động", heroText:"Hệ thống hóa toàn bộ quy trình huấn luyện và đào tạo an toàn tại doanh nghiệp, đảm bảo nhân sự được trang bị kiến thức bảo hộ chuẩn mực.", trial:"Dùng thử miễn phí", demo:"Xem video demo",
    overviewTag:"TỔNG QUAN GIẢI PHÁP", overviewTitle:"Chuẩn hóa hoạt động đào tạo trong một hệ thống thống nhất", overviewText:"Phân hệ hỗ trợ doanh nghiệp quản lý xuyên suốt hoạt động đào tạo ATVSLĐ, từ phân quyền người dùng, quản lý nhân sự và khóa học đến lập lịch, nhắc nhở, theo dõi kết quả và tổng hợp báo cáo.", checks:["Tối ưu hóa quy trình","Tự động hóa báo cáo"],
    processTitle:"Quy trình vận hành", process:[
      ["Phân quyền","Phân quyền người dùng quản lý hệ thống chi tiết"],["Quản lý lao động","Quản lý toàn bộ nhân sự trong hệ thống"],["Khóa đào tạo","Tạo khóa học, nội dung và tài liệu tập trung"],["Lập kế hoạch","Thiết lập lịch học và nhắc nhở tự động"],["Thông báo","Gửi thông tin kịp thời đến từng học viên"],["Theo dõi","Theo dõi tiến độ và kết quả học tập"],["Báo cáo","Tổng hợp báo cáo nhanh chóng, chính xác"]
    ],
    platformTag:"TRẢI NGHIỆM NỀN TẢNG", platformTitle:"Giao diện quản lý hiện đại & thông minh", platformText:"Mọi dữ liệu đào tạo được trình bày trực quan, dễ theo dõi và sẵn sàng cho công tác kiểm tra, báo cáo.", previous:"Trang trước", next:"Trang sau",
    slides:["Danh sách khóa học","Ma trận khóa học","Kế hoạch huấn luyện","Bài học trong khóa học","Nội dung bài học","Báo cáo tổng quan"],
    featureTag:"NHÓM TÍNH NĂNG CHÍNH", featureTitle:"Nhóm tính năng", features:[
      ["Xây dựng nội dung và khóa học","Xây dựng và quản lý tập trung nội dung, tài liệu cùng chương trình đào tạo."],["Tự động lập lịch và nhắc nhở","Tự động hóa kế hoạch, lịch học và thông báo đúng thời điểm."],["Quản lý học viên và phân quyền","Phân nhóm học viên, phân quyền và kiểm soát lịch sử đào tạo."],["Theo dõi kết quả và tuân thủ","Theo dõi tiến độ, kết quả và tổng hợp báo cáo phục vụ kiểm tra tuân thủ."]
    ],
    detailTitle:"Quản lý huấn luyện", detailParagraphs:[
      "Quản lý đào tạo An toàn Vệ sinh Lao động là quy trình then chốt, đảm bảo mọi người lao động được trang bị kiến thức và kỹ năng cần thiết để làm việc an toàn, đồng thời góp phần xây dựng văn hóa an toàn và giảm thiểu nguy cơ tai nạn, bệnh nghề nghiệp.",
      "Phân hệ tập trung thông tin người lao động, khóa đào tạo và toàn bộ nội dung học tập. Người dùng có thể tải lên tài liệu, video, bài giảng e-learning và bài kiểm tra; người lao động đăng nhập để hoàn thành các khóa đào tạo trực tuyến được phân công.",
      "Lịch đào tạo, thông báo nhắc nhở, tiến độ học tập, kết quả và báo cáo được quản lý trong một quy trình thống nhất, giúp doanh nghiệp dễ dàng theo dõi năng lực nhân sự và duy trì hồ sơ đào tạo sẵn sàng cho công tác kiểm tra tuân thủ.",
    ], detailDemo:"Đăng ký demo", detailContact:"Liên hệ tư vấn",
    valueTag:"GIÁ TRỊ MANG LẠI", valueTitle:"Giá trị nền tảng quản lý huấn luyện", values:[
      ["Phát triển lực lượng lao động","Nâng cao nhận thức và kỹ năng cho mọi nhân viên"],["Tuân thủ pháp luật & tiêu chuẩn","Đáp ứng yêu cầu về hồ sơ đào tạo ATVSLĐ"],["Tăng cường an toàn nơi làm việc","Giảm thiểu nguy cơ tai nạn lao động và bệnh nghề nghiệp"],["Tối ưu hóa hiệu quả & năng suất","Rút ngắn thời gian quản lý hồ sơ và tổng hợp báo cáo"]
    ],
    ctaTag:"BẮT ĐẦU NGAY HÔM NAY", ctaTitle:"Nâng cao năng lực nhân sự\nXây dựng văn hóa an toàn bền vững", consult:"Đăng ký tư vấn", document:"Tài liệu giải pháp",
    solutions:"GIẢI PHÁP", company:"CÔNG TY", contact:"LIÊN HỆ", footer:"Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường hàng đầu Việt Nam, giúp doanh nghiệp đạt chuẩn quốc tế.", address:"Tòa nhà Hà Nam, 26/5 Quốc lộ 13, Khu phố Tây, Phường Lái Thiêu, TP.HCM", terms:"Điều khoản sử dụng", privacy:"Chính sách bảo mật"
  },
  en: {
    heroTop:"Training Management", heroAccent:"Occupational", heroBottom:"Health & Safety", heroText:"Systemize your entire safety training process and ensure employees receive consistent, standards-based protection knowledge.", trial:"Start free trial", demo:"Watch demo",
    overviewTag:"SOLUTION OVERVIEW", overviewTitle:"Standardize training in one unified system", overviewText:"Manage the full OHS training lifecycle, from permissions, employees and courses to scheduling, reminders, results and consolidated reporting.", checks:["Streamlined workflows","Automated reporting"],
    processTitle:"Operating workflow", process:[["Permissions","Assign detailed system management roles"],["Employees","Manage the entire workforce in one system"],["Courses","Create courses, content and resources centrally"],["Planning","Schedule learning and automate reminders"],["Notifications","Send timely updates to each learner"],["Tracking","Monitor learning progress and outcomes"],["Reporting","Generate fast, accurate consolidated reports"]],
    platformTag:"PLATFORM EXPERIENCE", platformTitle:"A modern, intelligent management interface", platformText:"Training data stays visual, easy to follow and ready for audits and reporting.", previous:"Previous slide", next:"Next slide", slides:["Course list","Training matrix","Training plan","Course lessons","Lesson content","Overview report"],
    featureTag:"CORE CAPABILITIES", featureTitle:"Feature groups", features:[["Build content and courses","Create and manage learning content, resources and training programs in one place."],["Automated scheduling and reminders","Automate training plans, schedules and timely system notifications."],["Learner and access management","Group learners, assign permissions and maintain training histories."],["Results and compliance tracking","Track progress and results while keeping compliance reports ready."]],
    detailTitle:"Training Management", detailParagraphs:[
      "Occupational Safety and Health training management ensures every employee receives the knowledge and skills required to work safely, helping organizations strengthen safety culture and reduce workplace accidents and occupational disease.",
      "The module centralizes employees, courses and learning content. Users can upload documents, videos, e-learning lessons and quizzes, while employees sign in to complete assigned online training.",
      "Training schedules, reminders, learning progress, results and reports are managed in one consistent workflow so competency and compliance records remain easy to track and ready for review.",
    ], detailDemo:"Schedule a demo", detailContact:"Contact us",
    valueTag:"BUSINESS VALUE", valueTitle:"The value of a training management platform", values:[["Workforce Development","Improve awareness and skills across your workforce"],["Legal and Standard Compliance","Meet OHS training record requirements"],["Enhanced Workplace Safety","Reduce preventable workplace incidents and occupational disease"],["Optimized Efficiency & Productivity","Spend less time managing records and compiling reports"]],
    ctaTag:"GET STARTED TODAY", ctaTitle:"Elevating competence\nBuilding a sustainable culture of safety", consult:"Request consultation", document:"Solution brief",
    solutions:"SOLUTIONS", company:"COMPANY", contact:"CONTACT", footer:"A leading Health, Safety and Environment management software solution helping businesses pursue international standards.", address:"Ha Nam Building, 26/5 National Highway 13, Tay Quarter, Lai Thieu Ward, Ho Chi Minh City", terms:"Terms of Use", privacy:"Privacy Policy"
  }
} as const;

const slideImages = [
  "original-screenshots/course-list.png",
  "original-screenshots/course-matrix.png",
  "original-screenshots/training-plan.png",
  "original-screenshots/course-lessons.png",
  "original-screenshots/lesson-content.png",
  "original-screenshots/results-report.png",
];
const featureIcons = [BookOpenCheck, CalendarClock, UsersRound, ChartNoAxesCombined] as const;
const valueIcons = [UsersRound, Scale, ShieldCheck, Gauge] as const;
const valueImages = [
  trainingAsset("raw-8.jpg"),
  csmsAsset("product-guide.jpg"),
  csmsAsset("hero-workplace.jpg"),
  csmsAsset("core-workplace.jpg"),
] as const;

export default async function TrainingManagementPage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams; const locale:Locale = params.lang === "en" ? "en" : "vi"; const t = copy[locale]; const q = `?lang=${locale}`;
  const slides = t.slides.map((title,index) => ({ title, image:trainingAsset(slideImages[index]) }));
  const solutionLinks = getSolutionLinks(locale);
  const companyLinks = locale === "vi" ? ["Về chúng tôi","Khách hàng","Blog & Tin tức","Liên hệ"] : ["About Us","Customers","Blog & News","Contact"];
  return <div className={`${styles.page} hse-module-page`} lang={locale} id="top">
    <CustomerHeader locale={locale} active="solutions" chrome="csms" localePath="/training-management" />
    <main>
      <section className={`${styles.hero} hse-module-hero`} style={{backgroundImage:`url(${trainingAsset("raw-8.jpg")})`}} aria-label={locale === "vi" ? "Nhân sự trao đổi về kế hoạch đào tạo an toàn" : "Team discussing a safety training plan"}><div className={styles.heroOverlay}/><div className={`${styles.heroCopy} hse-module-hero-title`} style={{position:"absolute",inset:0,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px",textAlign:"center"}}><h1 style={{width:"100%",maxWidth:1050,margin:0,textAlign:"center"}}>{t.heroTop}</h1></div></section>
      <section className={styles.overview}><OverviewCarousel label={t.heroTop} images={[trainingAsset("raw-8.jpg"),csmsAsset("core-workplace.jpg"),csmsAsset("hero-workplace.jpg")]}/><div className={styles.sectionCopy}><h2 className={styles.singleLineOverviewTitle}>{t.heroTop}</h2><span className={styles.overviewRule} style={{display:"block",width:58,height:4,margin:"18px 0 22px",borderRadius:999,background:"#071b31"}}/><p>{t.overviewText}</p><div className={styles.overviewBenefits} style={{marginTop:22,display:"grid",gap:11}}>{t.checks.map(item=><span key={item} style={{display:"flex",alignItems:"center",gap:11,color:"#20334a",fontSize:15,fontWeight:700,lineHeight:1.45}}><b style={{width:24,height:24,flex:"0 0 24px",display:"inline-flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",background:"#071b31",color:"#fff",fontSize:13}}>✓</b>{item}</span>)}</div><div className={styles.overviewActions}><Link className="hse-primary-action" href={`/contact${q}`}>{t.trial}</Link><Link href={`/contact${q}`} className={styles.overviewSecondary}>{locale === "vi" ? "Liên hệ" : "Contact us"}</Link></div></div></section>
      <WorkflowSection title={t.processTitle} items={t.process} stepLabel={locale === "vi" ? "Bước" : "Step"}/>
      <section className={`${riskStyles.featureStrip} ${styles.trainingFeatureStrip}`} aria-labelledby="training-features-title"><div className={riskStyles.featureInner}>
        <h2 id="training-features-title">{t.featureTitle}</h2>
        <div className={riskStyles.featureGrid}>
          {t.features.map((item,index)=>{const Icon=featureIcons[index];return <article className={riskStyles.featureCard} key={item[0]} tabIndex={0}>
            <Icon aria-hidden="true" strokeWidth={1.7}/>
            <h3>{item[0]}</h3>
          </article>})}
        </div>
      </div></section>
      <section className={`${healthStyles.healthDetail} ${riskStyles.detailSection} ${styles.trainingDetailSection}`} aria-labelledby="training-detail-title">
        <div className={`${healthStyles.healthDetailInner} ${riskStyles.detailInner}`}>
          <div className={healthStyles.healthDetailHeading}><h2 id="training-detail-title">{t.detailTitle}</h2></div>
          <div className={`${healthStyles.healthDetailContent} ${riskStyles.detailContent}`}>{t.detailParagraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div>
          <div className={healthStyles.healthDetailActions}><Link href={`/contact${q}`}>{t.detailDemo}</Link><Link href={`/contact${q}`}>{t.detailContact}</Link></div>
        </div>
      </section>
      <section className={`${healthStyles.features} ${riskStyles.valuesSection}`} aria-labelledby="training-values-title"><div className={`${healthStyles.container} ${riskStyles.valuesContainer}`}>
        <h2 className={`${healthStyles.featuresCenterTitle} ${riskStyles.valuesTitle} ${styles.trainingValuesTitle}`} id="training-values-title">{t.valueTitle}</h2>
        <div className={`${healthStyles.featureTimeline} ${riskStyles.valuesGrid}`}>
          {t.values.map((item,index)=>{const Icon=valueIcons[index];return <article className={`${healthStyles.featureCard} ${riskStyles.valueCard}`} key={item[0]} tabIndex={0}>
            <img src={valueImages[index]} alt="" className={healthStyles.featureCardBg} loading="lazy" decoding="async"/>
            <div className={healthStyles.featureCardOverlay}/>
            <div className={`${healthStyles.featureCardIcon} ${riskStyles.valueIcon}`}><Icon aria-hidden="true" strokeWidth={1.5}/></div>
            <h3>{item[0]}</h3>
          </article>})}
        </div>
      </div></section>
      <div className={styles.experienceBrandGroup}>
        <TrainingExperience title={locale === "vi" ? "NÂNG\u00a0CAO\u00a0NĂNG\u00a0LỰC\nXÂY\u00a0DỰNG\u00a0VĂN\u00a0HÓA\nAN\u00a0TOÀN" : "ELEVATING\u00a0COMPETENCE\nBUILDING\u00a0A\u00a0CULTURE\nOF\u00a0SAFETY"} slides={slides} locale={locale}/>
        <BrandSignature locale={locale}/>
      </div>
    </main>
    <SiteFooter locale={locale}/>
  </div>;
}
