"use client";

import { useState } from "react";
import styles from "../csms/csms.module.css";
import { getSolutionLinks } from "./solution-links";

type Locale = "vi" | "en";

const copy = {
  vi: {
    description: "Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường tại Việt Nam, giúp doanh nghiệp đạt chuẩn quốc tế.",
    solutions: "GIẢI PHÁP",
    company: "CÔNG TY",
    contact: "LIÊN HỆ",
    companyLinks: ["Về chúng tôi", "Khách hàng", "Blog & Tin tức", "Liên hệ"],
    address: "Số 20 Đường ĐX 94, Khu phố 6, phường An Phú, TP Hồ Chí Minh",
    verified: "Đã xác thực ISO 27001",
    terms: "Điều khoản sử dụng",
    privacy: "Chính sách bảo mật",
  },
  en: {
    description: "Health, Safety and Environment management software for Vietnamese businesses pursuing international standards.",
    solutions: "SOLUTIONS",
    company: "COMPANY",
    contact: "CONTACT",
    companyLinks: ["About Us", "Customers", "Blog & News", "Contact"],
    address: "No. 20 DX 94 Street, Quarter 6, An Phu Ward, Ho Chi Minh City",
    verified: "ISO 27001 Verified",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
  },
} as const;

const asset = (name: string) => `/assets/csms/${name}`;

export default function SiteFooter({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const query = `?lang=${locale}`;
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  return <footer className={styles.footer} id="footer"><div className={styles.footerGrid}>
    <div className={styles.footerBrand}>
      <img src="/assets/shared/hse-provider-logo-color.png" className={styles.footerLogo} alt="HSE Provider" loading="lazy" decoding="async" />
      <p>{text.description}</p>
      <div className={styles.socials}>{[1,2,3].map((number) => <a href="#top" key={number} aria-label={`Social ${number}`}><img src={asset(`icon-social-${number}.svg`)} alt="" loading="lazy" /></a>)}</div>
    </div>
    <div className={styles.footerSolutions}><h3>{text.solutions}</h3><button type="button" className={styles.footerSolutionsToggle} aria-expanded={solutionsOpen} onClick={() => setSolutionsOpen(!solutionsOpen)}><span>{text.solutions}</span><b aria-hidden="true" /></button><div className={`${styles.footerSolutionsLinks} ${solutionsOpen ? styles.footerSolutionsLinksOpen : ""}`}>{getSolutionLinks(locale).map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div></div>
    <div><h3>{text.company}</h3>
      <a href={`/csms${query}`}>{text.companyLinks[0]}</a>
      <a href={`/customers${query}`}>{text.companyLinks[1]}</a>
      <a href={`/csms${query}`}>{text.companyLinks[2]}</a>
      <a href={`/contact${query}`}>{text.companyLinks[3]}</a>
    </div>
    <div className={styles.footerContact}><h3>{text.contact}</h3>
      <p><img src={asset("icon-location.svg")} alt="" />{text.address}</p>
      <p><img src={asset("icon-email-footer.svg")} alt="" />cskh@atld.vn</p>
      <p><img src={asset("icon-phone.svg")} alt="" /><span>0917-267-397 (Mr. Linh)</span></p>
      <p><img src={asset("icon-certification.svg")} alt="" />{text.verified}</p>
    </div>
  </div><div className={styles.footerBottom}><span>© 2025 HSE Provider. All rights reserved.</span><span>{text.terms} &nbsp;&nbsp;&nbsp; {text.privacy}</span></div></footer>;
}
