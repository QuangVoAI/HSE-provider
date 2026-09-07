"use client";

import { useEffect, useState } from "react";
import customerStyles from "./customers.module.css";
import csmsStyles from "../csms/csms.module.css";

type Locale = "vi" | "en";

const modules = [
  { vi: "Quản lý Huấn luyện", en: "Training Management", href: "/training-management" },
  { vi: "Quản lý Rủi ro", en: "Risk Management", href: "/risk-management" },
  { vi: "Báo cáo Quan sát an toàn", en: "Behavior-Based Safety", href: "/safety-observation" },
  { vi: "Quản lý Sức khỏe nghề nghiệp", en: "Health Management", href: "/health-management" },
  { vi: "Quản lý Thiết bị rủi ro cao", en: "High Risk Equipment", href: "/equipment-management" },
  { vi: "Quan trắc Môi trường lao động", en: "Occupational Hygiene Monitoring", href: "/environmental-management" },
  { vi: "Quản lý Nhà thầu", en: "Contractor Management", href: "/contractor-management" },
  { vi: "Đánh giá Văn hóa an toàn", en: "Safety Culture", href: "/safety-culture" },
  { vi: "Đánh giá Tuân thủ pháp luật", en: "Legal Compliance", href: "/legal-compliance" },
  { vi: "Quản lý Hóa chất & phóng xạ", en: "Chemical & Radiation Management", href: "/chemical-management" },
] as const;

const copy = {
  vi: { address: "Toà nhà Hà Nam, 26/5 Quốc lộ 13, TP.HCM", language: "Ngôn ngữ", login: "Đăng nhập", overview: "Tổng quan", solutions: "Giải pháp", customers: "Khách hàng", contact: "Liên hệ", demo: "Đăng ký demo", menu: "Mở menu" },
  en: { address: "Ha Nam Building, 26/5 National Highway 13, HCMC", language: "Language", login: "Log in", overview: "Overview", solutions: "Solutions", customers: "Customers", contact: "Contact", demo: "Book a demo", menu: "Open menu" },
} as const;

const asset = (name: string) => `/assets/csms/${name}`;

export default function CustomerHeader({ locale, active = "customers", chrome = "customers", localePath }: { locale: Locale; active?: "overview" | "customers" | "contact" | "solutions"; chrome?: "customers" | "csms"; localePath?: string }) {
  const styles = chrome === "csms" ? csmsStyles : customerStyles;
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);
  const text = copy[locale];
  const query = `?lang=${locale}`;

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

  const chooseLocale = (nextLocale: Locale) => {
    if (pendingLocale || nextLocale === locale) {
      setLanguageOpen(false);
      return;
    }
    setPendingLocale(nextLocale);
    window.setTimeout(() => {
      const destination = localePath ?? (active === "contact" ? "/contact" : active === "solutions" ? "/training-management" : "/customers");
      window.location.href = `${destination}?lang=${nextLocale}`;
    }, 320);
  };

  return <header className={styles.header}>
    <div className={styles.utility}><div className={styles.utilityInner}>
      <span><img src={asset("icon-location-utility.svg")} alt="" />{text.address}</span>
      <span><img src={asset("icon-email-utility.svg")} alt="" />duy@atld.vn - kimlinh@atld.vn</span>
      <div className={styles.utilityRight}>
        <div className={styles.languagePicker}>
          <button className={styles.languageButton} onClick={() => setLanguageOpen(!languageOpen)} aria-expanded={languageOpen}><img src={asset("icon-language.svg")} alt="" />{text.language}<b aria-hidden="true" /></button>
          {languageOpen && <div className={styles.languageMenu}>
            <button className={`${locale === "vi" ? styles.selectedLanguage : ""} ${pendingLocale === "vi" ? styles.selectingLanguage : ""}`} onClick={() => chooseLocale("vi")}>Tiếng Việt</button>
            <button className={`${locale === "en" ? styles.selectedLanguage : ""} ${pendingLocale === "en" ? styles.selectingLanguage : ""}`} onClick={() => chooseLocale("en")}>English</button>
          </div>}
        </div>
        <a href="https://qlat.1hse.vn/login" className={styles.utilityLogin}><img src={asset("icon-login.svg")} alt="" />{text.login}</a>
      </div>
    </div></div>
    <div className={styles.navbar}>
      <a href={`/csms${query}`}><img src="/assets/csms/figma-vn/logo-header.png" className={styles.logo} alt="HSE Provider" /></a>
      <nav className={styles.desktopNav} aria-label={text.menu}>
        <a className={active === "overview" ? styles.active : ""} href={`/csms${query}`} aria-current={active === "overview" ? "page" : undefined}>{text.overview}</a>
        <div className={styles.solutionDropdown} onMouseEnter={() => setSolutionOpen(true)} onMouseLeave={() => setSolutionOpen(false)} onFocus={() => setSolutionOpen(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSolutionOpen(false); }}>
          <a className={`${styles.solutionTrigger} ${active === "solutions" ? styles.active : ""}`} href={`/csms${query}#solutions`} aria-expanded={solutionOpen} aria-current={active === "solutions" ? "page" : undefined}>{text.solutions}<b aria-hidden="true" /></a>
          {solutionOpen && <div className={styles.solutionMenu} style={{ position:"absolute", zIndex:60, top:"calc(100% - 2px)", left:"50%", width:560, maxWidth:"calc(100vw - 48px)", display:"grid", gridTemplateColumns:"repeat(2, minmax(0, 1fr))", overflow:"hidden", transform:"translateX(-50%)", visibility:"visible", opacity:1, pointerEvents:"auto" }}>{modules.map((module) => {
            const href = module.href.startsWith("/csms") ? `/csms?lang=${locale}${module.href.slice(5)}` : `${module.href}?lang=${locale}`;
            return <a href={href} style={{ minWidth:0, whiteSpace:"normal", overflowWrap:"anywhere" }} key={module.vi}><span>{module[locale]}</span></a>;
          })}</div>}
        </div>
        <a className={active === "customers" ? styles.active : ""} href={`/customers${query}`} aria-current={active === "customers" ? "page" : undefined}>{text.customers}</a>
        <a className={active === "contact" ? styles.active : ""} href={`/contact${query}`} aria-current={active === "contact" ? "page" : undefined}>{text.contact}</a>
      </nav>
      <a className={styles.demoButton} href={`/contact${query}`}>{text.demo}</a>
      <button type="button" className={styles.menuButton} aria-label={text.menu} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation"><i /><i /><i /></button>
    </div>
    {menuOpen && <><button type="button" className={styles.mobileMenuBackdrop} aria-label={locale === "vi" ? "Đóng menu" : "Close menu"} onClick={(event) => { event.preventDefault(); event.stopPropagation(); setMenuOpen(false); }}/><nav id="mobile-navigation" className={styles.mobileMenu}>
      <a href={`/csms${query}`} onClick={() => setMenuOpen(false)}>{text.overview}</a><a href={`/csms${query}#solutions`} onClick={() => setMenuOpen(false)}>{text.solutions}</a><a href={`/customers${query}`} onClick={() => setMenuOpen(false)}>{text.customers}</a><a href={`/contact${query}`} onClick={() => setMenuOpen(false)}>{text.contact}</a>
      <div className={styles.mobileLanguagePicker}><button className={styles.mobileLanguageButton} onClick={() => setLanguageOpen(!languageOpen)} aria-expanded={languageOpen}><span>{text.language}</span><b aria-hidden="true" /></button>
        {languageOpen && <div className={styles.mobileLanguageMenu}><button className={locale === "vi" ? styles.selectedMobileLanguage : ""} onClick={() => chooseLocale("vi")}><span>Tiếng Việt</span><i>✓</i></button><button className={locale === "en" ? styles.selectedMobileLanguage : ""} onClick={() => chooseLocale("en")}><span>English</span><i>✓</i></button></div>}
      </div>
      <a href="https://qlat.1hse.vn/login" onClick={() => setMenuOpen(false)}>{text.login}</a>
      <a className={styles.mobileDemo} href={`/contact${query}`} onClick={() => setMenuOpen(false)}>{text.demo}</a>
    </nav></>}
  </header>;
}
