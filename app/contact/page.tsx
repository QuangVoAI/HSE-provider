import type { Metadata } from "next";
import Link from "next/link";
import CustomerHeader from "../customers/customer-header";
import BrandSignature from "../shared/brand-signature";
import SiteFooter from "../shared/site-footer";
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
      <section className={styles.hero}><img src="/assets/contact/contact-hero.png" alt="" fetchPriority="high" decoding="async" /><div/><div className={styles.heroCopy}><h1>{t.hero}</h1></div></section>
      <div className={styles.contactExperience}>
      <section className={styles.contactSection}><header><h2>{t.title}</h2></header><div className={styles.contactGrid}>
        <aside><div className={styles.officeIntro}><h3>{t.office}</h3></div><div className={styles.info}><img src="/assets/contact/icon-location.svg" alt=""/><div><b>{t.address}</b><p>{t.addressText}</p></div></div><div className={styles.info}><img src="/assets/contact/icon-email.svg" alt=""/><div><b>Email</b><p className={styles.emailLine}><a href="mailto:duy@atld.vn">duy@atld.vn</a><span>-</span><a href="mailto:kimlinh@atld.vn">kimlinh@atld.vn</a></p></div></div><div className={styles.info}><img src="/assets/contact/icon-phone.svg" alt=""/><div><b>{t.hotline}</b><p className={styles.phoneList}><a href="tel:+84917267397"><span>0917-267-397</span><small>Mr. Linh</small></a><a href="tel:+84944220601"><span>0944-220-601</span><small>Mr. Duy</small></a><a href="tel:+84345062815"><span>0345-062-815</span><small>Ms. My</small></a></p></div></div></aside>
        <ContactForm locale={locale}/>
      </div></section>
      <ContactMap locale={locale} />
      </div>
      <BrandSignature locale={locale}/>
    </main>
    <SiteFooter locale={locale}/>
  </div>;
}
