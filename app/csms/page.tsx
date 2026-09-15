"use client";

import { useEffect, useRef, useState } from "react";
import { VIETNAM_MOBILE_PATTERN } from "@/lib/lead-validation";
import CustomerHeader from "../customers/customer-header";
import BrandSignature from "../shared/brand-signature";
import SiteFooter from "../shared/site-footer";
import { getSolutionLinks } from "../shared/solution-links";
import styles from "./csms.module.css";

type Locale = "vi" | "en";

const asset = (name: string) => `/assets/csms/${name}`;
const figma = (name: string) => `/assets/csms/figma-vn/${name}`;

const modules = [
  { icon: "training.png", vi: ["Quản lý", ["Huấn luyện"]], en: ["Training", ["Management"]], href: "/training-management" },
  { icon: "risk.png", vi: ["Quản lý", ["Rủi ro"]], en: ["Risk", ["Management"]], href: "/risk-management" },
  { icon: "behavior.png", vi: ["Báo cáo", ["Quan sát", "An toàn"]], en: ["Behavior-Based", ["Safety"]], href: "/safety-observation" },
  { icon: "health.png", vi: ["Quản lý", ["Sức khỏe", "Nghề nghiệp"]], en: ["Health", ["Management"]], href: "/health-management" },
  { icon: "equipment.png", vi: ["Quản lý", ["Thiết bị", "Rủi ro cao"]], en: ["High Risk", ["Equipment", "Management"]], href: "/equipment-management" },
  { icon: "environment.png", vi: ["Quan trắc", ["Môi trường", "Lao động"]], en: ["Occupational", ["Hygiene", "Monitoring"]], href: "/environmental-management" },
  { icon: "contractor.png", vi: ["Quản lý", ["Nhà thầu"]], en: ["Contractor", ["Management"]], href: "/contractor-management" },
  { icon: "culture.png", vi: ["Đánh giá", ["Văn hóa", "An toàn"]], en: ["Safety", ["Culture"]], href: "/safety-culture" },
  { icon: "legal.png", vi: ["Đánh giá", ["Tuân thủ", "Pháp luật"]], en: ["Legal", ["Compliance"]], href: "/legal-compliance" },
  { icon: "chemical.png", vi: ["Quản lý", ["Hóa chất &", "Phóng xạ"]], en: ["Chemical & Radiation", ["Management"]], href: "/chemical-management" },
] as const;

const customers = [
  ["SCG", "customer-scg.png"], ["TEKCOM", "customer-tekcom.png"], ["Heineken", "customer-heineken.png"],
  ["Savills", "customer-savills.png"], ["Ajinomoto", "customer-ajinomoto.png"], ["Saint-Gobain", "customer-saint-gobain.png"],
  ["First Solar", "customer-first-solar.png"], ["De Heus", "customer-de-heus.png"], ["Suntory PepsiCo", "customer-suntory-pepsico.png"],
  ["Bosch", "customer-bosch.png"], ["Fujikura", "customer-fujikura.png"], ["FrieslandCampina", "customer-frieslandcampina.png"],
] as const;

const featureImages = [
  {
    src: "/assets/csms/figma-vn/workplace.png",
    vi: "Chuyên viên an toàn tại nơi làm việc",
    en: "Workplace safety professional",
    position: "center",
  },
  {
    src: "/assets/risk-management/risk-management-meeting.png",
    vi: "Nhóm chuyên gia trao đổi về quản lý rủi ro",
    en: "Specialists discussing risk management",
    position: "center",
  },
  {
    src: "/assets/health-management/hero-workplace-checkup-v3.png",
    vi: "Khám sức khỏe nghề nghiệp tại nhà máy",
    en: "Occupational health examination at a factory",
    position: "68% center",
  },
  {
    src: "/assets/contractor-management/hero-construction.png",
    vi: "Giám sát an toàn tại công trường",
    en: "Safety supervision at a construction site",
    position: "center",
  },
] as const;

const videos = [
  {
    id: "Mn9PsElz7cs",
    thumbnail: "https://i.ytimg.com/vi/Mn9PsElz7cs/sddefault.jpg",
    vi: "HSE Lawsoft – Người bạn đồng hành của người làm HSE",
    en: "HSE Lawsoft – Your companion for HSE management",
  },
  {
    id: "TQBrve8ekV4",
    thumbnail: "https://i.ytimg.com/vi_webp/TQBrve8ekV4/maxresdefault.webp",
    vi: "SOR – Báo cáo quan sát an toàn tại nơi làm việc",
    en: "SOR – Workplace safety observation reporting",
  },
  {
    id: "lEV9_ikz0Ps",
    thumbnail: "https://i.ytimg.com/vi_webp/lEV9_ikz0Ps/maxresdefault.webp",
    vi: "VHAT – Thiết lập chiến dịch đánh giá văn hóa an toàn",
    en: "VHAT – Set up a safety culture assessment campaign",
    start: 1,
  },
  {
    id: "E_afodd4d6U",
    thumbnail: "https://i.ytimg.com/vi_webp/E_afodd4d6U/maxresdefault.webp",
    vi: "VHAT – Hướng dẫn đánh giá văn hóa an toàn",
    en: "VHAT – Safety culture assessment guide",
  },
] as const;

const translations = {
  vi: {
    utilityAddress: "Toà nhà Hà Nam, 26/5 Quốc lộ 13, TP.HCM",
    language: "Ngôn ngữ", login: "Đăng nhập", overview: "Tổng quan", solutions: "Giải pháp",
    customers: "Khách hàng", contact: "Liên hệ", demo: "Đăng ký demo", menu: "Mở menu",
    heroTitle: "Hệ thống phần mềm Quản lý An toàn", tagline: "Sức khỏe – An toàn – Môi trường (HSE)",
    heroAlt: "Đội ngũ an toàn tại nơi làm việc", coreTitle: "Tính năng Cốt lõi EHS", customersTitle: "Khách hàng của chúng tôi",
    videoHeading: "Video giới thiệu & hướng dẫn", previousVideo: "Video trước", nextVideo: "Video tiếp theo", playVideo: "Phát video", contactTitle: "Thông tin liên hệ",
    addressLines: ["Toà nhà Hà Nam, 26/5 Quốc lộ 13,", "Khu phố Tây, Phường Lái Thiêu, TP.HCM"],
    consultTitle: "Đăng ký tư vấn", consultText: "Vui lòng để lại thông tin. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
    fullName: "Họ tên", fullNamePlaceholder: "Nguyễn Văn A", phone: "Số điện thoại", company: "Tên công ty", submitted: "Đã ghi nhận thông tin. Đội ngũ HSE Provider sẽ liên hệ với bạn sớm nhất.",
    companyPlaceholder: "Tên doanh nghiệp", submit: "Gửi yêu cầu",
    footerText: "Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường hàng đầu Việt Nam, giúp doanh nghiệp đạt chuẩn quốc tế.",
    solutionHeading: "GIẢI PHÁP", companyHeading: "CÔNG TY", contactHeading: "LIÊN HỆ",
    companyLinks: ["Về chúng tôi", "Khách hàng", "Blog & Tin tức", "Liên hệ"],
    verified: "Đã xác thực ISO 27001", terms: "Điều khoản sử dụng", privacy: "Chính sách bảo mật",
  },
  en: {
    utilityAddress: "Ha Nam Building, 26/5 National Highway 13, HCMC",
    language: "Language", login: "Log in", overview: "Overview", solutions: "Solutions",
    customers: "Customers", contact: "Contact", demo: "Book a demo", menu: "Open menu",
    heroTitle: "Safety Management Software System", tagline: "Health – Safety – Environment (HSE)",
    heroAlt: "Safety team at the workplace", coreTitle: "Core EHS Features", customersTitle: "Our Customers",
    videoHeading: "Introduction & tutorial videos", previousVideo: "Previous video", nextVideo: "Next video", playVideo: "Play video", contactTitle: "Contact Information",
    addressLines: ["Ha Nam Building, 26/5 National Highway 13, Lai Thieu Ward, Ho Chi Minh City"],
    consultTitle: "Request a Consultation", consultText: "Leave your information and our team will contact you as soon as possible.",
    fullName: "Full name", fullNamePlaceholder: "Your full name", phone: "Phone number", company: "Company name", submitted: "Your request has been recorded. The HSE Provider team will contact you soon.",
    companyPlaceholder: "Your company", submit: "Submit request",
    footerText: "A leading Health, Safety and Environment management software solution for Vietnamese businesses pursuing international standards.",
    solutionHeading: "SOLUTIONS", companyHeading: "COMPANY", contactHeading: "CONTACT",
    companyLinks: ["About Us", "Customers", "Blog & News", "Contact"],
    verified: "ISO 27001 Verified", terms: "Terms of Use", privacy: "Privacy Policy",
  },
} as const;

export default function CsmsOverview() {
  const [locale, setLocale] = useState<Locale>("vi");
  const [currentFeatureImage, setCurrentFeatureImage] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [videoControlsVisible, setVideoControlsVisible] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [consultationDemo, setConsultationDemo] = useState(false);
  const [consultationSending, setConsultationSending] = useState(false);
  const [consultationError, setConsultationError] = useState("");
  const videoFrames = useRef<Array<HTMLIFrameElement | null>>([]);
  const videoControlsTimer = useRef<number | null>(null);
  const copy = translations[locale];
  const footerSolutionLinks = getSolutionLinks(locale);
  const pauseCurrentVideo = () => videoFrames.current[currentVideo]?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
  const showPreviousVideo = () => { pauseCurrentVideo(); setPlayingVideo(null); setCurrentVideo((current) => (current - 1 + videos.length) % videos.length); };
  const showNextVideo = () => { pauseCurrentVideo(); setPlayingVideo(null); setCurrentVideo((current) => (current + 1) % videos.length); };
  const revealVideoControls = () => {
    setVideoControlsVisible(true);
    if (videoControlsTimer.current !== null) window.clearTimeout(videoControlsTimer.current);
    if (playingVideo === null) {
      videoControlsTimer.current = window.setTimeout(() => setVideoControlsVisible(false), 2800);
    }
  };

  useEffect(() => {
    const requestedLocale = new URLSearchParams(window.location.search).get("lang");
    if (requestedLocale === "vi" || requestedLocale === "en") {
      setLocale(requestedLocale);
    }
  }, []);

  useEffect(() => {
    const preloadVideoThumbnails = () => {
      videos.forEach((video) => {
        const thumbnail = new Image();
        thumbnail.decoding = "async";
        thumbnail.src = video.thumbnail;
      });
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(preloadVideoThumbnails, { timeout: 1400 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(preloadVideoThumbnails, 450);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (videoControlsTimer.current !== null) window.clearTimeout(videoControlsTimer.current);

    if (playingVideo !== null) {
      setVideoControlsVisible(true);
    } else {
      videoControlsTimer.current = window.setTimeout(() => setVideoControlsVisible(false), 2800);
    }

    return () => {
      if (videoControlsTimer.current !== null) window.clearTimeout(videoControlsTimer.current);
    };
  }, [playingVideo]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      setCurrentFeatureImage((current) => (current + 1) % featureImages.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return <div className={styles.page} id="top" lang={locale}>
    <CustomerHeader locale={locale} active="overview" chrome="csms" localePath="/csms" />

    <main className={styles.main}>
      <section className={styles.hero}><div className={styles.heroCopy}><h1>CSMS</h1><h2>{copy.heroTitle}</h2><i /><p>{copy.tagline}</p><div className={styles.heroActions}><a className={styles.heroDemo} href={`/contact?lang=${locale}`}>{copy.demo}</a><a className={styles.heroLogin} href="https://qlat.1hse.vn/login">{copy.login}</a></div></div><div className={styles.heroImage}><img src={figma("hero.png")} alt={copy.heroAlt} fetchPriority="high" decoding="async" /></div></section>

      <section className={styles.core} id="solutions"><h2>{copy.coreTitle}</h2><div className={styles.coreContent}><div className={styles.moduleGrid}>{modules.map((module, index) => {
        const [prefix, nameLines] = module[locale];
        const name = nameLines.join(" ");
        const destination = `${module.href}?lang=${locale}`;
        return <a href={destination} id={`solution-${index + 1}`} className={styles.moduleCard} key={module.icon}><span className={styles.moduleIcon}><img src={asset(`module-icons/${module.icon}`)} alt={`${prefix} ${name}`} loading="lazy" decoding="async" /></span><p><span>{prefix}</span><strong>{nameLines.map((line) => <span className={styles.moduleNameLine} key={line}>{line}</span>)}</strong></p></a>;
      })}</div><div className={styles.workplace}>{featureImages.map((image, index) => <img className={index === currentFeatureImage ? styles.activeWorkplaceImage : ""} src={image.src} alt={image[locale]} style={{ objectPosition: image.position }} aria-hidden={index !== currentFeatureImage} loading="lazy" decoding="async" key={image.src} />)}</div></div></section>

      <section className={styles.customers} id="customers"><h2>{copy.customersTitle}</h2><div className={styles.logoGrid}>{customers.map(([name, image]) => <div data-logo={name.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={name}><img src={asset(image)} alt={name} loading="lazy" decoding="async" /></div>)}</div><div className={styles.logoMarquee} aria-label={copy.customersTitle}>{[customers.slice(0, 6), customers.slice(6)].map((row, rowIndex) => <div className={`${styles.logoMarqueeRow} ${rowIndex === 1 ? styles.logoMarqueeRowReverse : ""}`} key={rowIndex}>{[...row, ...row].map(([name, image], index) => <div className={styles.logoMarqueeTile} data-logo={name.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={`${name}-${index}`}><img src={asset(image)} alt={index < row.length ? name : ""} aria-hidden={index >= row.length ? "true" : undefined} loading="lazy" decoding="async" /></div>)}</div>)}</div></section>

      <section className={styles.video} id="demo">
        <h2>{copy.videoHeading}</h2>
        <div className={`${styles.videoCarousel} ${videoControlsVisible ? styles.videoControlsVisible : ""}`} tabIndex={0} onPointerDown={revealVideoControls} onKeyDown={(event) => {
          if (event.key === "ArrowLeft") showPreviousVideo();
          if (event.key === "ArrowRight") showNextVideo();
        }}>
          <div className={styles.videoCard}>
            {playingVideo === currentVideo ? <iframe
              className={styles.activeVideo}
              ref={(frame) => { videoFrames.current[currentVideo] = frame; }}
              src={`https://www.youtube-nocookie.com/embed/${videos[currentVideo].id}?rel=0&enablejsapi=1&autoplay=1${"start" in videos[currentVideo] ? `&start=${videos[currentVideo].start}` : ""}`}
              title={videos[currentVideo][locale]}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              key={videos[currentVideo].id}
            /> : <button className={styles.videoPoster} type="button" onClick={() => setPlayingVideo(currentVideo)} aria-label={`${copy.playVideo}: ${videos[currentVideo][locale]}`}>
              <img src={videos[currentVideo].thumbnail} alt="" loading="lazy" decoding="async" />
              <span className={styles.videoPosterShade} aria-hidden="true" />
              <span className={styles.videoPlay} aria-hidden="true"><svg viewBox="0 0 68 48"><path className={styles.videoPlayShape} d="M66.52 7.74c-.78-2.93-3.09-5.24-6.02-6.02C55.22.3 34 .3 34 .3S12.78.3 7.5 1.72C4.57 2.5 2.26 4.81 1.48 7.74.06 13.02.06 24 .06 24s0 10.98 1.42 16.26c.78 2.93 3.09 5.24 6.02 6.02C12.78 47.7 34 47.7 34 47.7s21.22 0 26.5-1.42c2.93-.78 5.24-3.09 6.02-6.02C67.94 34.98 67.94 24 67.94 24s0-10.98-1.42-16.26Z"/><path d="m45 24-18-10v20Z" fill="#fff"/></svg></span>
              <span className={styles.videoTitle}>{videos[currentVideo][locale]}</span>
            </button>}
            <button className={`${styles.videoArrow} ${styles.videoArrowPrevious}`} type="button" onClick={showPreviousVideo} aria-label={copy.previousVideo}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg></button>
            <button className={`${styles.videoArrow} ${styles.videoArrowNext}`} type="button" onClick={showNextVideo} aria-label={copy.nextVideo}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>

      <section className={styles.contact} id="contact"><div className={styles.contactCard}>
        <aside><h2>{copy.contactTitle}</h2><p><img src={asset("icon-location.svg")} alt="" /><span>{copy.addressLines[0]}<br />{copy.addressLines[1]}</span></p><p><img src={asset("icon-email.svg")} alt="" /><span>duy@atld.vn<br />kimlinh@atld.vn</span></p><p><img src={asset("icon-phone.svg")} alt="" /><span className={styles.contactPhoneList}><span>0917-267-397 (Mr. Linh)</span><span>0944-220-601 (Mr. Duy)</span><span>0345-062-815 (Ms. My)</span></span></p></aside>
        <form onSubmit={async (event) => { event.preventDefault(); setConsultationSending(true); setConsultationError(""); const form = event.currentTarget; const values = Object.fromEntries(new FormData(form).entries()); try { const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, locale, requestType: "consultation", source: "csms-page" }) }); if (!response.ok) throw new Error("lead_failed"); const result = await response.json() as { demo?: boolean }; setConsultationDemo(Boolean(result.demo)); setConsultationSubmitted(true); form.reset(); } catch { setConsultationError(locale === "vi" ? "Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau." : "We could not send your request. Please try again."); } finally { setConsultationSending(false); } }}><div className={styles.formIntro}><h2>{copy.consultTitle}</h2><p>{copy.consultText}</p>{consultationSubmitted && <p role="status" className={styles.formSuccess}>{consultationDemo ? (locale === "vi" ? "Đã gửi thử thành công. Đây là bản demo nên thông tin không được lưu." : "Demo submission successful. Your information was not stored.") : copy.submitted}</p>}{consultationError && <p role="alert" className={styles.formError}>{consultationError}</p>}</div><div className={styles.formFields}><label>{copy.fullName}<input required minLength={2} maxLength={100} name="name" autoComplete="name" placeholder={copy.fullNamePlaceholder} /></label><label>Email<input required maxLength={254} name="email" type="email" autoComplete="email" placeholder="email@company.com" /></label><label>{copy.phone}<span className={styles.requiredMark} aria-hidden="true">*</span><input required name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern={VIETNAM_MOBILE_PATTERN} title={locale === "vi" ? "Nhập số di động Việt Nam, ví dụ 0917 267 397 hoặc +84 917 267 397" : "Enter a Vietnamese mobile number, for example 0917 267 397 or +84 917 267 397"} placeholder="0900 000 000" /></label><label>{copy.company}<input maxLength={150} name="company" autoComplete="organization" placeholder={copy.companyPlaceholder} /></label><label className={styles.formMessage}>{locale === "vi" ? "Nội dung yêu cầu" : "Message"}<textarea required minLength={5} maxLength={2000} name="message" placeholder={locale === "vi" ? "Bạn cần hỗ trợ điều gì?" : "How can we help?"} /></label></div><button type="submit" disabled={consultationSending}>{consultationSending ? (locale === "vi" ? "ĐANG GỬI..." : "SENDING...") : copy.submit}</button></form>
      </div></section>
      <BrandSignature locale={locale}/>
    </main>

    <SiteFooter locale={locale}/>
  </div>;
}
