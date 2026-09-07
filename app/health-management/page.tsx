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
import { getSolutionLinks } from "../shared/solution-links";

type Locale = "vi" | "en";

const headerTranslations = {
  vi: {
    address: "Toà nhà Hà Nam, 26/5 Quốc lộ 13, TP.HCM",
    language: "Ngôn ngữ",
    login: "Đăng nhập",
    overview: "Tổng quan",
    solutions: "Giải pháp",
    customers: "Khách hàng",
    contact: "Liên hệ",
    demo: "Đăng ký demo",
    menu: "Mở menu",
  },
  en: {
    address: "Ha Nam Building, 26/5 National Highway 13, HCMC",
    language: "Language",
    login: "Log in",
    overview: "Overview",
    solutions: "Solutions",
    customers: "Customers",
    contact: "Contact",
    demo: "Book a demo",
    menu: "Open menu",
  },
} as const;

const hm = (name: string) => `/assets/health-management/${name}`;
const csms = (name: string) => `/assets/csms/${name}`;
const figma = (name: string) => `/assets/csms/figma-vn/${name}`;

const csmsModules = [
  { icon: "training.png", vi: "Quản lý Huấn luyện", en: "Training Management" },
  { icon: "risk.png", vi: "Quản lý Rủi ro", en: "Risk Management" },
  { icon: "behavior.png", vi: "Báo cáo Quan sát an toàn", en: "Behavior-Based Safety" },
  { icon: "health.png", vi: "Quản lý Sức khỏe nghề nghiệp", en: "Health Management" },
  { icon: "equipment.png", vi: "Quản lý Thiết bị rủi ro cao", en: "High Risk Equipment Management" },
  { icon: "environment.png", vi: "Quan trắc Môi trường lao động", en: "Occupational Hygiene Monitoring" },
  { icon: "contractor.png", vi: "Quản lý Nhà thầu", en: "Contractor Management" },
  { icon: "culture.png", vi: "Đánh giá Văn hóa an toàn", en: "Safety Culture" },
  { icon: "legal.png", vi: "Đánh giá Tuân thủ pháp luật", en: "Legal Compliance" },
  { icon: "chemical.png", vi: "Quản lý Hóa chất & phóng xạ", en: "Chemical & Radiation Management" },
] as const;

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
    heroTitle: "Quản lý sức khỏe nghề nghiệp", heroAccent: "toàn diện", heroDesc: "Quản lý quy trình khám và hồ sơ sức khỏe trên một nền tảng thống nhất.", viewWorkflow: "Xem quy trình",
    overviewTitle: "Quản lý sức khỏe toàn chu kỳ", overviewAccent: "người lao động", overviewDesc: "Từ tuyển dụng đến phát hiện bệnh nghề nghiệp — bốn giai đoạn khám được liên kết trên một nền tảng, bảo vệ toàn diện sức khỏe và đảm bảo tuân thủ pháp luật lao động.",
    workflowTitle: "Quy trình vận hành", experienceTitle: "Trải nghiệm người dùng", featuresTitle: "Nhóm chức năng", valueTitle: "Dữ liệu tốt hơn", valueAccent: "Quyết định chủ động hơn",
    detailTitle: "Quản lý sức khỏe nghề nghiệp", detailIntro: "Một chu trình quản lý xuyên suốt giúp doanh nghiệp chủ động bảo vệ người lao động, phòng ngừa bệnh nghề nghiệp và duy trì nguồn nhân lực khỏe mạnh.", scheduleDemo: "Đăng ký demo", contactUs: "Liên hệ tư vấn",
    footerText: "Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường hàng đầu Việt Nam, giúp doanh nghiệp đạt chuẩn quốc tế.", solutionHeading: "GIẢI PHÁP", companyHeading: "CÔNG TY", contactHeading: "LIÊN HỆ", companyLinks: ["Về chúng tôi", "Khách hàng", "Blog & Tin tức", "Liên hệ"], verified: "Đã xác thực ISO 27001", terms: "Điều khoản sử dụng", privacy: "Chính sách bảo mật",
  },
  en: {
    heroTitle: "Comprehensive occupational health", heroAccent: "management", heroDesc: "Manage examinations and employee health records on one unified platform.", viewWorkflow: "View workflow",
    overviewTitle: "End-to-end workforce", overviewAccent: "health management", overviewDesc: "Connect four examination stages—from recruitment to occupational disease screening—to protect employee health and support legal compliance.",
    workflowTitle: "Operational workflow", experienceTitle: "User experience", featuresTitle: "Feature groups", valueTitle: "Better data", valueAccent: "More proactive decisions",
    detailTitle: "Health Management", detailIntro: "An end-to-end management cycle helps organizations protect employees, prevent occupational illness and maintain a healthier workforce.", scheduleDemo: "Schedule a demo", contactUs: "Contact us",
    footerText: "A leading Health, Safety and Environment management software solution for Vietnamese businesses pursuing international standards.", solutionHeading: "SOLUTIONS", companyHeading: "COMPANY", contactHeading: "CONTACT", companyLinks: ["About Us", "Customers", "Blog & News", "Contact"], verified: "ISO 27001 Verified", terms: "Terms of Use", privacy: "Privacy Policy",
  },
} as const;

export default function HealthManagementPage() {
  const [workflowStep, setWorkflowStep] = useState(0);
  const [demoIndex, setDemoIndex] = useState(0);
  const [isDemoLightboxOpen, setIsDemoLightboxOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("vi");
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);
  const headerCopy = headerTranslations[locale];
  const pageCopy = pageTranslations[locale];
  const semanticTitle = (text: string) => {
    const phrases = locale === "vi"
      ? ["Quản lý sức khỏe", "nghề nghiệp", "người lao động", "Quyết định chủ động hơn"]
      : ["occupational health", "health management", "proactive decisions"];
    return phrases.sort((a, b) => b.length - a.length).reduce((result, phrase) => result.replaceAll(phrase, phrase.replaceAll(" ", "\u00a0")), text);
  };
  const footerSolutionLinks = getSolutionLinks(locale);
  const localizedExamGroups = locale === "en" ? examGroupsEn : examGroups;
  const localizedWorkflow = locale === "en" ? workflowEn : workflow;
  const localizedHeroSlides = locale === "en" ? heroSlidesEn : heroSlides;
  const localizedFeatureGroups = locale === "en" ? featureGroupsEn : featureGroups;
  const localizedValues = locale === "en" ? valuesEn : values;
  const localizedValueTitleLines = locale === "en" ? valueTitleLinesEn : valueTitleLines;
  const localizedDemoScreens = locale === "en" ? demoScreensEn : demoScreens;

  const chooseLocale = (nextLocale: Locale) => {
    if (pendingLocale) return;
    setPendingLocale(nextLocale);
    window.setTimeout(() => {
      setLocale(nextLocale);
      document.documentElement.lang = nextLocale;
      setLanguageOpen(false);
      setPendingLocale(null);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", nextLocale);
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }, 320);
  };

  useEffect(() => {
    const requestedLocale = new URLSearchParams(window.location.search).get("lang");
    if (requestedLocale === "en" || requestedLocale === "vi") setLocale(requestedLocale);
  }, []);

  useEffect(() => {
    if (!isDemoLightboxOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDemoLightboxOpen(false);
      if (event.key === "ArrowLeft") setDemoIndex((current) => (current - 1 + localizedDemoScreens.length) % localizedDemoScreens.length);
      if (event.key === "ArrowRight") setDemoIndex((current) => (current + 1) % localizedDemoScreens.length);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isDemoLightboxOpen, localizedDemoScreens.length]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 6500);
    const workflowTimer = window.setInterval(() => setWorkflowStep((current) => (current + 1) % workflow.length), 2500);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(workflowTimer);
    };
  }, []);

  useEffect(() => {
    if (isDemoLightboxOpen) return;
    const timer = window.setInterval(() => setDemoIndex((current) => (current + 1) % localizedDemoScreens.length), 4000);
    return () => window.clearInterval(timer);
  }, [isDemoLightboxOpen, localizedDemoScreens.length]);

  return <div className={styles.page} lang={locale}>
    <header className={styles.header}>
      <div className={styles.utility}><div className={styles.utilityInner}>
        <span><img src={csms("icon-location-utility.svg")} alt="" />{headerCopy.address}</span><span><img src={csms("icon-email-utility.svg")} alt="" />duy@atld.vn - kimlinh@atld.vn</span>
        <div className={styles.utilityRight}>
          <div className={styles.languagePicker}>
            <button className={styles.languageButton} onClick={() => setLanguageOpen(!languageOpen)} aria-expanded={languageOpen}><img src={csms("icon-language.svg")} alt="" />{headerCopy.language}<b /></button>
            {languageOpen && <div className={styles.languageMenu}>
              <button className={`${locale === "vi" ? styles.selectedLanguage : ""} ${pendingLocale === "vi" ? styles.selectingLanguage : ""}`} onClick={() => chooseLocale("vi")}>Tiếng Việt</button>
              <button className={`${locale === "en" ? styles.selectedLanguage : ""} ${pendingLocale === "en" ? styles.selectingLanguage : ""}`} onClick={() => chooseLocale("en")}>English</button>
            </div>}
          </div>
          <a href="https://qlat.1hse.vn/login" className={styles.utilityLogin}><img src={csms("icon-login.svg")} alt="" />{headerCopy.login}</a>
        </div>
      </div></div>
      <div className={styles.navbar}>
        <a href={`/csms?lang=${locale}`}><img src={figma("logo-header.png")} alt="HSE Provider" /></a>
        <nav>
          <a href={`/csms?lang=${locale}`}>{headerCopy.overview}</a>
          <div className={styles.solutionDropdown}>
            <a className={`${styles.active} ${styles.solutionTrigger}`} href="#overview">{headerCopy.solutions}<b aria-hidden="true" /></a>
            <div className={styles.solutionMenu}>
              {csmsModules.map((module) => {
                const routes: Record<string,string> = {
                  "training.png": "/training-management",
                  "risk.png": "/risk-management",
                  "behavior.png": "/safety-observation",
                  "health.png": "/health-management",
                  "equipment.png": "/equipment-management",
                  "environment.png": "/environmental-management",
                  "contractor.png": "/contractor-management",
                  "culture.png": "/safety-culture",
                  "legal.png": "/legal-compliance",
                  "chemical.png": "/chemical-management",
                };
                return <a href={`${routes[module.icon]}?lang=${locale}`} key={module.icon}><span>{module[locale]}</span></a>;
              })}
            </div>
          </div>
          <a href={`/customers?lang=${locale}`}>{headerCopy.customers}</a><a href={`/contact?lang=${locale}`}>{headerCopy.contact}</a>
        </nav>
        <div className={styles.navActions}><a href={`/contact?lang=${locale}`}>{headerCopy.demo}</a></div>
        <button type="button" className={styles.menuButton} aria-label={headerCopy.menu} onClick={() => { setMenuOpen(!menuOpen); setLanguageOpen(false); }} aria-expanded={menuOpen} aria-controls="health-mobile-navigation"><i /><i /><i /></button>
      </div>
      {menuOpen && <><button type="button" className={styles.mobileMenuBackdrop} aria-label={locale === "vi" ? "Đóng menu" : "Close menu"} onClick={() => setMenuOpen(false)}/><nav className={styles.mobileMenu} id="health-mobile-navigation">
        <a href={`/csms?lang=${locale}`}>{headerCopy.overview}</a><a href="#overview" onClick={() => setMenuOpen(false)}>{headerCopy.solutions}</a><a href={`/customers?lang=${locale}`}>{headerCopy.customers}</a><a href={`/contact?lang=${locale}`} onClick={() => setMenuOpen(false)}>{headerCopy.contact}</a>
        <div className={styles.mobileLanguagePicker}>
          <button className={styles.mobileLanguageButton} onClick={() => setLanguageOpen(!languageOpen)} aria-expanded={languageOpen} aria-controls="health-mobile-language-menu"><span>{headerCopy.language}</span><b aria-hidden="true" /></button>
          {languageOpen && <div className={styles.mobileLanguageMenu} id="health-mobile-language-menu">
            <button className={`${locale === "vi" ? styles.selectedMobileLanguage : ""} ${pendingLocale === "vi" ? styles.selectingLanguage : ""}`} onClick={() => chooseLocale("vi")}><span>Tiếng Việt</span><i aria-hidden="true">✓</i></button>
            <button className={`${locale === "en" ? styles.selectedMobileLanguage : ""} ${pendingLocale === "en" ? styles.selectingLanguage : ""}`} onClick={() => chooseLocale("en")}><span>English</span><i aria-hidden="true">✓</i></button>
          </div>}
        </div>
        <a href="https://qlat.1hse.vn/login" onClick={() => setMenuOpen(false)}>{headerCopy.login}</a>
        <a className={styles.mobileDemo} href={`/contact?lang=${locale}`} onClick={() => setMenuOpen(false)}>{headerCopy.demo}</a>
      </nav></>}
    </header>

    <main id="top">
      <section className={styles.hero}>
        <div className={styles.heroBackdrop}>{localizedHeroSlides.map(([image, alt], index) => <img key={image} className={index === heroSlide ? styles.activeHeroImage : ""} src={hm(image)} alt={index === heroSlide ? alt : ""} />)}</div>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1>{semanticTitle(pageCopy.heroTitle)} <em>{semanticTitle(pageCopy.heroAccent)}</em></h1>
          </div>
        </div>
      </section>

      <section className={styles.overview} id="overview"><div className={styles.container}>
        <div className={styles.sectionIntro}>
          <h2>{semanticTitle(pageCopy.overviewTitle)} <span className={styles.h2Accent}>{semanticTitle(pageCopy.overviewAccent)}</span></h2>
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

      <section className={styles.value}><div className={styles.container}><div className={styles.valueIntro}><h2><span>{semanticTitle(pageCopy.valueTitle)}</span><span>{semanticTitle(pageCopy.valueAccent)}</span></h2></div><div className={styles.valueList}>{localizedValues.map(([title, description], index) => { const Icon = valueIcons[index]; return <article key={title} tabIndex={0}><div className={styles.valueCardFront}><div className={styles.valueIconWrapper}><Icon aria-hidden="true" strokeWidth={1.5} /></div><h3>{localizedValueTitleLines[index].map((line) => <span className={styles.valueTitleLine} key={line}>{line}</span>)}</h3></div><p className={styles.valueCardDescription}>{description}</p></article>; })}</div></div></section>

      <div className={styles.experienceBrandGroup}>
        <section className={styles.workflowDemo}><div className={styles.container}>
          <div className={styles.demoHeading}>
            <div>
              <h2>{pageCopy.experienceTitle}</h2>
            </div>
          </div>

          <div className={styles.tabletMockupContainer} role="tabpanel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hm("hands-holding-ipad-white.jpg")} alt="Mockup máy tính bảng" className={styles.tabletBg} />
            <div
              className={styles.tabletScreen}
              style={{ cursor: "pointer" }}
              onClick={() => setDemoIndex((prev) => (prev + 1) % localizedDemoScreens.length)}
              title="Click để xem màn hình tiếp theo"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hm(localizedDemoScreens[demoIndex].file)}
                alt={`${localizedDemoScreens[demoIndex].title}. Bấm để xem ảnh lớn`}
                className={styles.tabletScreenImg}
                style={{ objectFit: "cover", objectPosition: "top center", cursor: "zoom-in" }}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsDemoLightboxOpen(true);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    setIsDemoLightboxOpen(true);
                  }
                }}
                role="button"
                tabIndex={0}
              />
            </div>
            <button type="button" className={styles.imageInteractionHint} onClick={() => setIsDemoLightboxOpen(true)} aria-label={locale === "en" ? "Open image full screen" : "Mở ảnh chi tiết toàn màn hình"}>
              <span className={styles.hintDesktop}>{locale === "en" ? "Click the image to view it full screen" : "Bấm vào ảnh để xem chi tiết toàn màn hình"}</span>
              <span className={styles.hintMobile}>{locale === "en" ? "Tap the image to view it full screen" : "Chạm vào ảnh để xem chi tiết toàn màn hình"}</span>
            </button>
          </div>
          {isDemoLightboxOpen && (
            <div className={styles.imageLightbox} role="dialog" aria-modal="true" aria-label={localizedDemoScreens[demoIndex].title}>
              <button type="button" className={styles.imageLightboxBackdrop} aria-label="Đóng ảnh" onClick={() => setIsDemoLightboxOpen(false)} />
              <div className={styles.imageLightboxPanel}>
                <button type="button" className={styles.imageLightboxClose} onClick={() => setIsDemoLightboxOpen(false)} aria-label="Đóng ảnh">×</button>
                <button type="button" className={`${styles.imageLightboxNav} ${styles.imageLightboxPrev}`} onClick={() => setDemoIndex((current) => (current - 1 + localizedDemoScreens.length) % localizedDemoScreens.length)} aria-label={locale === "en" ? "Previous image" : "Ảnh trước"}>‹</button>
                <img src={hm(localizedDemoScreens[demoIndex].file)} alt={localizedDemoScreens[demoIndex].title} className={styles.imageLightboxImage} />
                <button type="button" className={`${styles.imageLightboxNav} ${styles.imageLightboxNext}`} onClick={() => setDemoIndex((current) => (current + 1) % localizedDemoScreens.length)} aria-label={locale === "en" ? "Next image" : "Ảnh tiếp theo"}>›</button>
                <p>{localizedDemoScreens[demoIndex].title}</p>
              </div>
            </div>
          )}
        </div></section>

        <BrandSignature locale={locale}/>
      </div>

    </main>

    <footer className={styles.footer} id="footer"><div className={styles.footerGrid}>
      <div className={styles.footerBrand}>
        <img src={csms("hse-provider-logo-footer.png")} className={styles.footerLogo} alt="HSE Provider" />
        <p>{pageCopy.footerText}</p>
        <div className={styles.socials}>
          {[1,2,3].map((n) => <a href="#top" key={n} aria-label={`Social ${n}`}><img src={csms(`icon-social-${n}.svg`)} alt="" /></a>)}
        </div>
      </div>
      <div>
        <h3>{pageCopy.solutionHeading}</h3>
        {footerSolutionLinks.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </div>
      <div>
        <h3>{pageCopy.companyHeading}</h3>
        {pageCopy.companyLinks.map((link, index) => <a href={index === 1 ? `/customers?lang=${locale}` : index === 3 ? `/contact?lang=${locale}` : `/csms?lang=${locale}`} key={link}>{link}</a>)}
      </div>
      <div className={styles.footerContact}>
        <h3>{pageCopy.contactHeading}</h3>
        <p><img src={csms("icon-location.svg")} alt="" />Toà nhà Hà Nam, 26/5 Quốc lộ 13, Khu phố Tây, Phường Lái Thiêu, TP.HCM</p>
        <p><img src={csms("icon-email-footer.svg")} alt="" />duy@atld.vn - kimlinh@atld.vn</p>
        <p><img src={csms("icon-phone.svg")} alt="" /><span>0917-267-397 (Mr.Linh)<br />0944-220-601 (Mr.Duy)<br />0345-062-815 (Ms.My)</span></p>
        <p><img src={csms("icon-certification.svg")} alt="" />{pageCopy.verified}</p>
      </div>
    </div><div className={styles.footerBottom}><span>© 2025 HSE Provider. All rights reserved.</span><span>{pageCopy.terms} &nbsp;&nbsp;&nbsp; {pageCopy.privacy}</span></div></footer>
  </div>;
}
