"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  CalendarCheck2,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Eye,
  HeartPulse,
  Scale,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  TrendingUp,
  UserRoundCheck,
  Volume2,
  Wind,
} from "lucide-react";
import styles from "./health-management.module.css";
import BrandSignature from "../shared/brand-signature";
import CustomerHeader from "../customers/customer-header";
import SiteFooter from "../shared/site-footer";
import { getImageCaption } from "../shared/image-caption";
import { getSolutionLinks } from "../shared/solution-links";

type Locale = "vi" | "en";

const hm = (name: string) => `/assets/health-management/${name}`;
const csms = (name: string) => `/assets/csms/${name}`;

const examGroups = [
  {
    step: "01",
    title: "Khám tuyển dụng",
    desc: "Đánh giá thể lực nền tảng ngay trước khi nhận việc, phát hiện sớm bệnh lý nền để hỗ trợ bố trí công việc phù hợp và an toàn.",
    photo: "exam-card-recruitment.jpg",
  },
  {
    step: "02",
    title: "Khám định kỳ",
    desc: "Thực hiện định kỳ thường niên để theo dõi biến động sức khỏe theo thời gian, sớm nhận diện các dấu hiệu bất thường để can thiệp kịp thời.",
    photo: "hero-workplace-checkup-v3.png",
  },
  {
    step: "03",
    title: "Khám chuyên khoa",
    desc: "Dành riêng cho nhân sự tiếp xúc môi trường độc hại (hóa chất, tiếng ồn, nhiệt độ...), tập trung đánh giá chuyên sâu các cơ quan chịu rủi ro.",
    photo: "hero-workplace-exam-v4.png",
  },
  {
    step: "04",
    title: "Khám phát hiện bệnh nghề nghiệp",
    desc: "Chẩn đoán chính xác bệnh lý nghề nghiệp khi có triệu chứng nghi ngờ, hỗ trợ chế độ bảo hiểm y tế và đề xuất bồi dưỡng, điều chuyển vị trí.",
    photo: "exam-card-disease.jpg",
  },
] as const;

const workflow = [
  ["Cấu hình dữ liệu nền", "Thiết lập cơ sở, đơn vị y tế và hồ sơ nhân viên.", "raw-02.png"],
  ["Gói khám & tiêu chí", "Chuẩn hóa tiêu chí khám mẫu và phân loại sức khỏe.", "raw-06.png"],
  ["Kế hoạch & phân bổ", "Tạo đợt khám và phân bổ danh sách nhân viên tham gia.", "raw-15.png"],
  ["Cập nhật kết quả", "Ghi nhận kết luận và lưu trữ hồ sơ sức khỏe tập trung.", "raw-11.png"],
  ["Phân tích & báo cáo", "Tổng hợp dữ liệu phục vụ theo dõi và quản trị.", "raw-10.png"],
] as const;

const workflowIcons = [Database, SlidersHorizontal, CalendarDays, ClipboardCheck, ChartNoAxesCombined] as const;

const heroSlides = [
  ["hero-occupational-health-v2.png", "Bác sĩ tư vấn sức khỏe nghề nghiệp cho người lao động"],
  ["hero-workplace-checkup-v3.png", "Đo huyết áp định kỳ cho người lao động ngay tại nhà máy"],
  ["hero-workplace-exam-v4.png", "Khám sức khỏe lâm sàng tại nơi làm việc"],
] as const;

const featureGroups = [
  [SlidersHorizontal, "Cấu hình đợt khám sức khỏe", "Tùy biến linh hoạt bộ tiêu chuẩn, danh mục gói khám và bệnh viện liên kết cho từng giai đoạn.", "factory_health_config_1786951063951.jpg"],
  [ClipboardCheck, "Cập nhật & lưu trữ kết quả", "Số hóa toàn bộ hồ sơ y tế và phân loại kết quả sức khỏe theo các tiêu chí đã cấu hình.", "factory_health_results_1786951078832.jpg"],
  [ChartNoAxesCombined, "Phân tích & thống kê", "Dashboard trực quan về tình trạng sức khỏe nhân sự toàn công ty, nhận diện sớm các xu hướng bệnh lý.", "factory_health_analysis_1786951277324.jpg"],
  [CalendarDays, "Lập kế hoạch & lịch khám", "Tự động nhắc lịch, quản lý phân bổ nhân lực tham gia khám tránh ảnh hưởng vận hành sản xuất.", "factory_health_schedule_1786951450654.jpg"],
] as const;

const values = [
  ["Phòng ngừa là trọng tâm cốt lõi", "Hệ thống giúp nhận diện rủi ro sức khỏe trước khi trở thành sự cố y tế nghiêm trọng."],
  ["Sức khỏe là ưu tiên hàng đầu", "Minh chứng cho sự cam kết của doanh nghiệp đối với cuộc sống người lao động."],
  ["Tuân thủ pháp lý & đạo đức", "Đảm bảo hồ sơ luôn sẵn sàng cho các đợt thanh kiểm tra của cơ quan quản lý."],
  ["Cải tiến liên tục", "Dữ liệu quá khứ là nền tảng để tối ưu chính sách phúc lợi và bảo hộ lao động."],
] as const;

const valueTitleLines = [
  ["Phòng ngừa là", "trọng tâm cốt lõi"],
  ["Sức khỏe là", "ưu tiên hàng đầu"],
  ["Tuân thủ pháp lý", "và đạo đức"],
  ["Cải tiến liên tục"],
] as const;

const valueIcons = [ShieldCheck, HeartPulse, Scale, TrendingUp] as const;

const demoScreens = [
  { title: "Thiết lập bộ tiêu chí mẫu", desc: "Chuẩn hóa các gói khám mẫu theo quy định Bộ Y tế cho từng đối tượng.", file: "original-screenshots/sample-criteria.png" },
  { title: "Lập kế hoạch khám sức khỏe", desc: "Tạo đợt khám, phân bổ thời gian và danh sách nhân sự tham gia đợt khám.", file: "original-screenshots/exam-plan.png" },
  { title: "Cập nhật & quản lý kết quả", desc: "Ghi nhận kết luận lâm sàng, cận lâm sàng và phân loại sức khỏe nhân viên.", file: "original-screenshots/exam-results.png" },
  { title: "Quản lý danh sách bệnh", desc: "Lưu trữ và tra cứu danh mục bệnh lý nghề nghiệp và bệnh thông thường.", file: "original-screenshots/disease-list.png" },
  { title: "Cấu hình loại khám", desc: "Thiết lập danh mục các loại hình khám sức khỏe của doanh nghiệp.", file: "original-screenshots/exam-types.png" },
  { title: "Cấu hình tiêu chí khám", desc: "Định nghĩa chi tiết các chỉ số, giới hạn đo cho từng danh mục khám.", file: "original-screenshots/exam-criteria.png" },
] as const;

const examGroupsEn = [
  { step: "01", title: "Pre-employment examination", desc: "Assess baseline fitness before employment, identify underlying conditions early and support safe job placement.", photo: "exam-card-recruitment.jpg" },
  { step: "02", title: "Periodic examination", desc: "Monitor health changes annually and identify abnormal signs early for timely intervention.", photo: "hero-workplace-checkup-v3.png" },
  { step: "03", title: "Specialist examination", desc: "Provide focused assessment for employees exposed to chemicals, noise, heat and other occupational hazards.", photo: "hero-workplace-exam-v4.png" },
  { step: "04", title: "Occupational disease screening", desc: "Diagnose suspected occupational conditions and support insurance, benefits and appropriate job reassignment.", photo: "exam-card-disease.jpg" },
] as const;

const workflowEn = [
  ["Configure master data", "Set up facilities, healthcare providers and employee records.", "raw-02.png"],
  ["Packages & criteria", "Standardize examination criteria and health classifications.", "raw-06.png"],
  ["Plan & allocate", "Create examination rounds and assign participating employees.", "raw-15.png"],
  ["Update results", "Record conclusions and centrally store health records.", "raw-11.png"],
  ["Analyze & report", "Aggregate data for monitoring and management reporting.", "raw-10.png"],
] as const;

const heroSlidesEn = [
  ["hero-occupational-health-v2.png", "Occupational health consultation for an employee"],
  ["hero-workplace-checkup-v3.png", "Periodic blood pressure screening at the workplace"],
  ["hero-workplace-exam-v4.png", "Clinical health examination at the workplace"],
] as const;

const featureGroupsEn = [
  [SlidersHorizontal, "Configure health examinations", "Customize standards, examination packages and partner hospitals for each stage.", "factory_health_config_1786951063951.jpg"],
  [ClipboardCheck, "Update & store results", "Digitize medical records and classify employee health results.", "factory_health_results_1786951078832.jpg"],
  [ChartNoAxesCombined, "Analytics & statistics", "Visualize workforce health and identify emerging health trends early.", "factory_health_analysis_1786951277324.jpg"],
  [CalendarDays, "Planning & scheduling", "Automate reminders and allocate participants without disrupting operations.", "factory_health_schedule_1786951450654.jpg"],
] as const;

const valuesEn = [
  ["Prevention at the core", "Identify health risks before they become serious medical incidents."],
  ["Health comes first", "Demonstrate the organization’s commitment to employee wellbeing."],
  ["Legal & ethical compliance", "Keep records ready for inspections by regulatory authorities."],
  ["Continuous improvement", "Use historical data to improve welfare and occupational protection policies."],
] as const;

const valueTitleLinesEn = [
  ["Prevention", "at the core"],
  ["Health", "comes first"],
  ["Legal & ethical", "compliance"],
  ["Continuous improvement"],
] as const;

const demoScreensEn = [
  { title: "Configure examination types", desc: "Set up the organization’s health examination categories.", file: "loai-kham-suc-khoe.png" },
  { title: "Manage disease lists", desc: "Store and search occupational and common disease categories.", file: "danh-sach-benh.png" },
  { title: "Configure examination criteria", desc: "Define measurements and limits for each examination category.", file: "tieu-chi-kham.png" },
  { title: "Create criteria templates", desc: "Standardize examination packages for different employee groups.", file: "bo-tieu-chi-mau.png" },
  { title: "Plan health examinations", desc: "Create rounds, schedules and participant lists.", file: "ke-hoach-kham.png" },
  { title: "Update & manage results", desc: "Record clinical conclusions and employee health classifications.", file: "ket-qua-kham.png" },
] as const;

const pageTranslations = {
  vi: {
    heroTitle: "Quản lý sức khỏe nghề nghiệp", heroAccent: "", heroDesc: "Quản lý quy trình khám và hồ sơ sức khỏe trên một nền tảng thống nhất.", viewWorkflow: "Xem quy trình",
    overviewTitle: "Quản lý sức khỏe toàn chu kỳ", overviewAccent: "người lao động", overviewDesc: "Từ tuyển dụng đến phát hiện bệnh nghề nghiệp — bốn giai đoạn khám được liên kết trên một nền tảng, bảo vệ toàn diện sức khỏe và đảm bảo tuân thủ pháp luật lao động.",
    workflowTitle: "Quy trình vận hành", experienceTitle: "Trải nghiệm người dùng", featuresTitle: "Nhóm chức năng", valueTitle: "Dữ liệu tốt hơn", valueAccent: "Quyết định chủ động hơn",
    detailTitle: "Quản lý sức khỏe nghề nghiệp", detailIntro: "Một chu trình quản lý xuyên suốt giúp doanh nghiệp chủ động bảo vệ người lao động, phòng ngừa bệnh nghề nghiệp và duy trì nguồn nhân lực khỏe mạnh.", scheduleDemo: "Đăng ký demo", contactUs: "Liên hệ tư vấn",
    footerText: "Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường hàng đầu Việt Nam, giúp doanh nghiệp đạt chuẩn quốc tế.", solutionHeading: "GIẢI PHÁP", companyHeading: "CÔNG TY", contactHeading: "LIÊN HỆ", companyLinks: ["Về chúng tôi", "Khách hàng", "Blog & Tin tức", "Liên hệ"], verified: "Đã xác thực ISO 27001", terms: "Điều khoản sử dụng", privacy: "Chính sách bảo mật",
  },
  en: {
    heroTitle: "Health Management", heroAccent: "", heroDesc: "Manage examinations and employee health records on one unified platform.", viewWorkflow: "View workflow",
    overviewTitle: "End-to-end workforce", overviewAccent: "health management", overviewDesc: "Connect four examination stages—from recruitment to occupational disease screening—to protect employee health and support legal compliance.",
    workflowTitle: "Operational workflow", experienceTitle: "User experience", featuresTitle: "Feature groups", valueTitle: "Better data", valueAccent: "More proactive decisions",
    detailTitle: "Health Management", detailIntro: "An end-to-end management cycle helps organizations protect employees, prevent occupational illness and maintain a healthier workforce.", scheduleDemo: "Schedule a demo", contactUs: "Contact us",
    footerText: "A leading Health, Safety and Environment management software solution for Vietnamese businesses pursuing international standards.", solutionHeading: "SOLUTIONS", companyHeading: "COMPANY", contactHeading: "CONTACT", companyLinks: ["About Us", "Customers", "Blog & News", "Contact"], verified: "ISO 27001 Verified", terms: "Terms of Use", privacy: "Privacy Policy",
  },
} as const;

export default function HealthManagementPage() {
  const [workflowStep, setWorkflowStep] = useState(0);
  const [demoIndex, setDemoIndex] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [locale, setLocale] = useState<Locale>("vi");
  const pageCopy = pageTranslations[locale];
  const footerSolutionLinks = getSolutionLinks(locale);
  const localizedExamGroups = locale === "en" ? examGroupsEn : examGroups;
  const localizedWorkflow = locale === "en" ? workflowEn : workflow;
  const localizedHeroSlides = locale === "en" ? heroSlidesEn : heroSlides;
  const localizedFeatureGroups = locale === "en" ? featureGroupsEn : featureGroups;
  const localizedValues = locale === "en" ? valuesEn : values;
  const localizedValueTitleLines = locale === "en" ? valueTitleLinesEn : valueTitleLines;
  const localizedDemoScreens = locale === "en" ? demoScreensEn : demoScreens;
  const activeDemoCaption = getImageCaption(localizedDemoScreens[demoIndex].file, locale, localizedDemoScreens[demoIndex].title);

  useEffect(() => {
    const requestedLocale = new URLSearchParams(window.location.search).get("lang");
    if (requestedLocale === "en" || requestedLocale === "vi") setLocale(requestedLocale);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 6500);
    const workflowTimer = window.setInterval(() => setWorkflowStep((current) => (current + 1) % workflow.length), 2500);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(workflowTimer);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setDemoIndex((current) => (current + 1) % localizedDemoScreens.length), 4000);
    return () => window.clearInterval(timer);
  }, [localizedDemoScreens.length]);

  return <div className={`${styles.page} hse-module-page`} lang={locale}>
    <CustomerHeader locale={locale} active="solutions" chrome="csms" localePath="/health-management" />

    <main id="top">
      <section className={`${styles.hero} hse-module-hero`}>
        <div className={styles.heroBackdrop}>{localizedHeroSlides.map(([image, alt], index) => <img key={image} className={index === heroSlide ? styles.activeHeroImage : ""} src={hm(image)} alt={index === heroSlide ? alt : ""} />)}</div>
        <div className={styles.heroInner}>
          <div className={`${styles.heroCopy} hse-module-hero-title`}>
            <h1>{pageCopy.heroTitle}{pageCopy.heroAccent ? <> <em>{pageCopy.heroAccent}</em></> : null}</h1>
          </div>
        </div>
      </section>

      <section className={styles.overview} id="overview"><div className={styles.container}>
        <div className={styles.sectionIntro}>
          <h2>{pageCopy.overviewTitle} <span className={styles.h2Accent}>{pageCopy.overviewAccent}</span></h2>
          <p>{pageCopy.overviewDesc}</p>
        </div>
        <div className={styles.examGrid}>
          {localizedExamGroups.map((group) => (
            <article key={group.title} className={styles.examCard}>
              <div className={styles.cardVisual}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hm(group.photo)} alt={group.title} className={styles.cardPhoto} />
              </div>
              <div className={styles.cardBody}>
                <h3>{group.title}</h3>
                <p>{group.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div></section>

      <section className={styles.workflow} id="workflow"><div className={styles.container}>
        <div className={styles.workflowHeading}>
          <div className={styles.workflowHeadingLeft}>
            <h2>{pageCopy.workflowTitle}</h2>
            <div className={styles.headingAccentLine} />
          </div>
        </div>

        <div className={styles.workflowVisual}>
          <svg className={styles.workflowSvg} viewBox="0 0 1000 460" preserveAspectRatio="none">
             <path d="M -50 300 L 110 300 C 165 300, 165 160, 220 160 L 330 160 C 385 160, 385 300, 440 300 L 560 300 C 615 300, 615 160, 670 160 L 780 160 C 835 160, 835 300, 890 300 L 1050 300" className={styles.svgBg} />
             <path d="M -50 300 L 110 300 C 165 300, 165 160, 220 160 L 330 160 C 385 160, 385 300, 440 300 L 560 300 C 615 300, 615 160, 670 160 L 780 160 C 835 160, 835 300, 890 300 L 1050 300" className={styles.svgDot} />
          </svg>

          <svg className={styles.mobileWorkflowSvg} viewBox="0 0 100 500" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M 22 50 L 22 82 C 22 106, 78 94, 78 126 L 78 150 L 78 182 C 78 206, 22 194, 22 226 L 22 250 L 22 282 C 22 306, 78 294, 78 326 L 78 350 L 78 382 C 78 406, 22 394, 22 426 L 22 450"
              className={styles.mobileSvgBg}
            />
            <path
              d="M 22 50 L 22 82 C 22 106, 78 94, 78 126 L 78 150 L 78 182 C 78 206, 22 194, 22 226 L 22 250 L 22 282 C 22 306, 78 294, 78 326 L 78 350 L 78 382 C 78 406, 22 394, 22 426 L 22 450"
              className={styles.mobileSvgDot}
            />
            {[50, 150, 250, 350, 450].map((y, index) => (
              <circle key={y} cx={index % 2 === 0 ? 22 : 78} cy={y} r="2.2" className={styles.mobileSvgNode} />
            ))}
          </svg>

          {localizedWorkflow.map(([title, desc], index) => {
            const isDown = index % 2 === 0;
            const isActive = index === workflowStep;
            return (
              <div key={index} className={`${styles.visualNode} ${isActive ? styles.activeVisualNode : ''}`} style={{ left: `${(index * 22.5) + 5}%`, top: isDown ? '300px' : '160px' }}
                   onClick={() => setWorkflowStep(index)}>
                {index !== 0 && <div className={styles.nodeDot} />}
                <div className={styles.nodeBox}>
                  <div className={styles.nodeNum}>{index + 1}</div>
                  <h3>{title}</h3>
                </div>
                <div className={`${styles.nodeDesc} ${isDown ? styles.descBottom : styles.descTop}`}>
                  <p>{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div></section>

      <section className={styles.features}><div className={styles.container}>
        <h2 className={styles.featuresCenterTitle}>{pageCopy.featuresTitle}</h2>
        <div className={styles.featureTimeline}>
          <div className={styles.featureTimelineLine} />
          {localizedFeatureGroups.map(([Icon, title, _desc, bgImage]) => (
            <article key={title} className={styles.featureCard}>
              <img src={hm(bgImage)} alt="" className={styles.featureCardBg} />
              <div className={styles.featureCardOverlay} />
              <div className={styles.featureCardIcon}>
                <Icon strokeWidth={1.2} />
              </div>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div></section>

      <section className={styles.healthDetail} id="health-details" aria-labelledby="health-detail-title">
        <div className={styles.healthDetailInner}>
          <div className={styles.healthDetailHeading}>
            <h2 id="health-detail-title">{pageCopy.detailTitle}</h2>
            <p>{pageCopy.detailIntro}</p>
          </div>
          <div className={styles.healthDetailContent}>
            {localizedExamGroups.map((group) => (
              <p key={group.title}><strong>{group.title}:</strong> {group.desc}</p>
            ))}
          </div>
          <div className={styles.healthDetailActions}>
            <a href={`/contact?lang=${locale}`}>{pageCopy.scheduleDemo}</a>
            <a href={`/contact?lang=${locale}`}>{pageCopy.contactUs}</a>
          </div>
        </div>
      </section>

      <section className={styles.value}><div className={styles.container}><div className={styles.valueIntro}><h2><span>{pageCopy.valueTitle}</span><span>{pageCopy.valueAccent}</span></h2></div><div className={styles.valueList}>{localizedValues.map(([title, description], index) => { const Icon = valueIcons[index]; return <article key={title} tabIndex={0}><div className={styles.valueCardFront}><div className={styles.valueIconWrapper}><Icon aria-hidden="true" strokeWidth={1.5} /></div><h3>{localizedValueTitleLines[index].map((line) => <span className={styles.valueTitleLine} key={line}>{line}</span>)}</h3></div><p className={styles.valueCardDescription}>{description}</p></article>; })}</div></div></section>

      <div className={styles.experienceBrandGroup}>
        <section className={styles.workflowDemo}><div className={styles.container}>
          <div className={styles.demoHeading}>
            <div>
              <h2>{pageCopy.experienceTitle}</h2>
            </div>
          </div>

          <div className={styles.experienceViewer} role="tabpanel" aria-label={activeDemoCaption}>
            <p className={styles.experienceViewerCaption}>{activeDemoCaption}</p>
            <div className={styles.experienceImageFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hm(localizedDemoScreens[demoIndex].file)}
                alt={activeDemoCaption}
                className={styles.experienceImage}
              />
            </div>
            {localizedDemoScreens.length > 1 && <>
              <button type="button" className={`${styles.experienceViewerNav} ${styles.experienceViewerPrev}`} onClick={() => setDemoIndex((current) => (current - 1 + localizedDemoScreens.length) % localizedDemoScreens.length)} aria-label={locale === "en" ? "Previous image" : "Ảnh trước"}>‹</button>
              <button type="button" className={`${styles.experienceViewerNav} ${styles.experienceViewerNext}`} onClick={() => setDemoIndex((current) => (current + 1) % localizedDemoScreens.length)} aria-label={locale === "en" ? "Next image" : "Ảnh tiếp theo"}>›</button>
            </>}
          </div>
        </div></section>

        <BrandSignature locale={locale}/>
      </div>

    </main>

    <SiteFooter locale={locale}/>
  </div>;
}
