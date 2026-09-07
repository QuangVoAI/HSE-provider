import type { Metadata } from "next";
import Link from "next/link";
import CustomerHeader from "../customers/customer-header";
import BrandSignature from "../shared/brand-signature";
import { getSolutionLinks } from "../shared/solution-links";
import chrome from "../csms/csms.module.css";
import ContactForm from "./contact-form";
import ContactMap from "./contact-map";
import styles from "./contact.module.css";

type Locale = "vi" | "en";
export const metadata: Metadata = { title:"Contact | HSE Provider", description:"Contact HSE Provider for HSE software solutions and consultation." };
const asset = (name:string) => `/assets/csms/${name}`;
const copy = {
  vi:{ hero:"Liên hệ", heroText:"Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng sự an toàn của doanh nghiệp bạn.", title:"Chúng tôi sẵn sàng lắng nghe nhu cầu của bạn", office:"Văn phòng", address:"Địa chỉ", addressText:"Tòa nhà Hà Nam, 26/5 Quốc lộ 13, Khu phố Tây, Phường Lái Thiêu, TP.HCM", hotline:"Hotline hỗ trợ", solutions:"GIẢI PHÁP", company:"CÔNG TY", contact:"LIÊN HỆ", footer:"Giải pháp phần mềm quản lý Sức khỏe, An toàn và Môi trường hàng đầu Việt Nam, giúp doanh nghiệp đạt chuẩn quốc tế.", terms:"Điều khoản sử dụng", privacy:"Chính sách bảo mật"},
  en:{ hero:"Contact", heroText:"We are always ready to listen and support a safer future for your business.", title:"We are ready to understand your needs", intro:"Complete the form or contact us directly through the channels below.", office:"Office", address:"Address", addressText:"Ha Nam Building, 26/5 National Highway 13, Tay Quarter, Lai Thieu Ward, Ho Chi Minh City", hotline:"Support hotline", solutions:"SOLUTIONS", company:"COMPANY", contact:"CONTACT", footer:"A leading Health, Safety and Environment management software solution helping businesses pursue international standards.", terms:"Terms of Use", privacy:"Privacy Policy"}
} as const;

export default async function ContactPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const params=await searchParams; const locale:Locale=params.lang==="en"?"en":"vi"; const t=copy[locale]; const q=`?lang=${locale}`;
  const solutionLinks=getSolutionLinks(locale);
  const companyLinks=locale==="vi"?["Về chúng tôi","Khách hàng","Blog & Tin tức","Liên hệ"]:["About Us","Customers","Blog & News","Contact"];
  return <div className={styles.page} lang={locale} id="top"><CustomerHeader locale={locale} active="contact" chrome="csms" />
    <main>
      <section className={styles.hero}><img src="/assets/contact/contact-hero.png" alt="" /><div/><div className={styles.heroCopy}><h1>{t.hero}</h1></div></section>
      <div className={styles.contactExperience}>
      <section className={styles.contactSection}><header><h2>{t.title}</h2></header><div className={styles.contactGrid}>
        <aside><div className={styles.officeIntro}><h3>{t.office}</h3></div><div className={styles.info}><img src="/assets/contact/icon-location.svg" alt=""/><div><b>{t.address}</b><p>{t.addressText}</p></div></div><div className={styles.info}><img src="/assets/contact/icon-email.svg" alt=""/><div><b>Email</b><p className={styles.emailLine}><a href="mailto:duy@atld.vn">duy@atld.vn</a><span>-</span><a href="mailto:kimlinh@atld.vn">kimlinh@atld.vn</a></p></div></div><div className={styles.info}><img src="/assets/contact/icon-phone.svg" alt=""/><div><b>{t.hotline}</b><p className={styles.phoneList}><a href="tel:+84917267397"><span>0917-267-397</span><small>Mr. Linh</small></a><a href="tel:+84944220601"><span>0944-220-601</span><small>Mr. Duy</small></a><a href="tel:+84345062815"><span>0345-062-815</span><small>Ms. My</small></a></p></div></div></aside>
        <ContactForm locale={locale}/>
      </div></section>
      <ContactMap locale={locale} />
      </div>
      <BrandSignature locale={locale}/>
    </main>
    <footer className={chrome.footer} id="footer"><div className={chrome.footerGrid}>
      <div className={chrome.footerBrand}><img src={asset("hse-provider-logo-footer.png")} className={chrome.footerLogo} alt="HSE Provider"/><p>{t.footer}</p><div className={chrome.socials}>{[1,2,3].map(n=><a href="#top" key={n} aria-label={`Social ${n}`}><img src={asset(`icon-social-${n}.svg`)} alt=""/></a>)}</div></div>
      <div><h3>{t.solutions}</h3>{solutionLinks.map((item)=><Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
      <div><h3>{t.company}</h3>{companyLinks.map((label,index)=><Link href={index===1?`/customers${q}`:index===3?`/contact${q}`:`/csms${q}`} key={label}>{label}</Link>)}</div>
      <div className={chrome.footerContact}><h3>{t.contact}</h3><p><img src={asset("icon-location.svg")} alt=""/>{t.addressText}</p><p><img src={asset("icon-email-footer.svg")} alt=""/>duy@atld.vn - kimlinh@atld.vn</p><p><img src={asset("icon-phone.svg")} alt=""/><span>0917-267-397 (Mr.Linh)<br/>0944-220-601 (Mr.Duy)<br/>0345-062-815 (Ms.My)</span></p><p><img src={asset("icon-certification.svg")} alt=""/>{locale==="vi"?"Đã xác thực ISO 27001":"ISO 27001 Verified"}</p></div>
    </div><div className={chrome.footerBottom}><span>© 2025 HSE Provider. All rights reserved.</span><span>{t.terms} &nbsp;&nbsp;&nbsp; {t.privacy}</span></div></footer>
  </div>;
}
