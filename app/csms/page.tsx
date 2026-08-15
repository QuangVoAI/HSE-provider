"use client";

import { useState } from "react";
import styles from "./csms.module.css";

const modules = [
  ["Training", "Management", "module-training.svg"],
  ["Risk", "Management", "module-risk.svg"],
  ["Behavior-Based", "Safety", "module-behavior.svg"],
  ["Health", "Management", "module-health.svg"],
  ["High Risk Equipment", "Management", "module-equipment.svg"],
  ["Occupational Hygiene", "Monitoring", "module-hygiene.svg"],
  ["Contractor", "Management", "module-contractor.svg"],
  ["Safety", "Culture", "module-culture.svg"],
  ["Legal", "Compliance", "module-legal.svg"],
  ["Chemical & Radiation", "Management", "module-chemical.svg"],
] as const;

const customers = [
  ["SCG", "customer-scg.png"], ["TEKCOM", "customer-tekcom.png"],
  ["Heineken", "customer-heineken.png"], ["Savills", "customer-savills.png"],
  ["Ajinomoto", "customer-ajinomoto.png"], ["Saint-Gobain", "customer-saint-gobain.png"],
  ["First Solar", "customer-first-solar.png"], ["De Heus", "customer-de-heus.png"],
  ["Suntory PepsiCo", "customer-suntory-pepsico.png"], ["Bosch", "customer-bosch.png"],
  ["Fujikura", "customer-fujikura.png"], ["FrieslandCampina", "customer-frieslandcampina.png"],
] as const;

const asset = (name: string) => `/assets/csms/${name}`;

function Logo({ footer = false }: { footer?: boolean }) {
  return <img className={styles.logo} src={asset(footer ? "hse-provider-logo-footer.png" : "hse-provider-logo.png")} alt="HSE Provider" />;
}

export default function CsmsOverview() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.page} id="top">
      <header className={styles.header}>
        <div className={styles.utility}>
          <div className={styles.utilityInner}>
            <div className={styles.utilityGroup}>
              <span><img src={asset("icon-location-utility.svg")} alt="" />Ha Nam Building, 26/5 National Highway 13, HCMC</span>
              <span><img src={asset("icon-email-utility.svg")} alt="" />cskh@atld.vn - my@atld.vn</span>
            </div>
            <div className={styles.utilityGroup}>
              <span><img src={asset("icon-language.svg")} alt="" />Language</span>
              <span><img src={asset("icon-login.svg")} alt="" />Login</span>
            </div>
          </div>
        </div>
        <div className={styles.navbar}>
          <a href="#top" aria-label="HSE Provider home"><Logo /></a>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <a className={styles.active} href="#top">Overview</a>
            <a href="#solutions">Solutions</a>
            <a href="#customers">Customers</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className={styles.navActions}>
            <a href="tel:+842812345678">+84 28 1234 5678</a>
            <a className={styles.demoButton} href="#contact">Schedule a demo</a>
          </div>
          <button className={styles.menuButton} type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
        {menuOpen && (
          <nav className={styles.mobileMenu} aria-label="Mobile navigation">
            {[["Overview", "#top"], ["Solutions", "#solutions"], ["Customers", "#customers"], ["Contact", "#contact"]].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <div className={styles.mobileRule} />
            <span>English</span><span>Login</span>
            <a className={styles.mobileDemo} href="#contact" onClick={() => setMenuOpen(false)}>Request a Demo</a>
            <a className={styles.mobilePhone} href="tel:+842812345678">+84 28 1234 5678</a>
          </nav>
        )}
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>HSE Provider / CSMS</span>
            <h1><em>Safety, made<br />operational.</em><span>One connected system for Health, Safety and Environment teams.</span></h1>
            <i className={styles.blueLine} />
            <p>Health – Safety – Environment (HSE)</p>
            <a className={styles.signIn} href="#contact">Talk to our team <b>→</b></a>
            <div className={styles.mobileHeroActions}>
              <a href="#contact">Talk to our team</a><a href="#solutions">Explore features</a>
            </div>
          </div>
          <div className={styles.heroImage}><img src={asset("hero-workplace.jpg")} alt="Safety professionals in a workplace" /><span>Built for the field</span></div>
        </section>

        <section className={styles.core} id="solutions">
          <div className={styles.sectionIntro}><span>01 / Product capabilities</span><h2>Core functions for<br />every HSE workflow.</h2><p>Clear ownership, consistent processes and the operational visibility teams need each day.</p></div>
          <div className={styles.coreContent}>
            <div className={styles.moduleGrid}>
              {modules.map(([title, subtitle, icon]) => (
                <article className={styles.moduleCard} key={title + subtitle}>
                  <span className={styles.moduleIcon}><img src={asset(icon)} alt="" /></span>
                  <div><h3>{title}</h3><p>{subtitle}</p></div>
                  <span className={styles.chevron} aria-hidden="true">›</span>
                </article>
              ))}
            </div>
            <div className={styles.coreImage}><img src={asset("core-workplace.jpg")} alt="Engineers and safety officers in an industrial workplace" /><p>One platform. Every site.</p></div>
          </div>
        </section>

        <section className={styles.customers} id="customers">
          <div className={styles.contentWidth}>
            <div className={styles.sectionHeader}><span>02 / Trusted across industry</span><h2>Teams that put safety to work.</h2></div>
            <div className={styles.logoGrid}>
              {customers.map(([name, image]) => <div className={styles.logoTile} key={name}><img src={asset(image)} alt={name} /></div>)}
            </div>
          </div>
        </section>

        <section className={styles.compliance}>
          <div className={styles.complianceCopy}><span>03 / See CSMS in action</span><h2>Confidence comes from clarity.</h2><p>See how a connected HSE workflow can make day-to-day safety work easier to manage.</p><a className={styles.textLink} href="#contact">Request a tailored walkthrough <b>→</b></a></div>
          <div className={styles.guideVisual}>
            <img src={asset("product-guide.jpg")} alt="HSE product guide preview" />
            <button type="button" className={styles.playButton} aria-label="Play user guide"><img src={asset("icon-play.svg")} alt="" /></button>
            <div className={styles.guideLabel}><span>CSMS walkthrough</span><strong>Watch the overview</strong></div>
          </div>
        </section>

        <section className={styles.contact} id="contact">
          <div className={styles.contactCard}>
            <aside className={styles.office}>
              <span>Start a conversation</span><h2>Talk to an<br />HSE specialist.</h2>
              <p><img src={asset("icon-location.svg")} alt="" />Ha Nam Building, 26/5 National Highway 13, Tay Quarter, Lai Thieu Ward, Ho Chi Minh City</p>
              <p><img src={asset("icon-email.svg")} alt="" />duy@atld.vn - kimlinh@atld.vn</p>
              <p className={styles.phoneList}><img src={asset("icon-phone.svg")} alt="" /><span>0917-267-397 (Mr.Linh)<br />0944-220-601 (Mr.Duy)<br />0345-062-815 (Ms.My)</span></p>
            </aside>
            <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
              <p>Tell us a little about your team and we&apos;ll help you find the right next step.</p>
              <label><span>Name</span><input aria-label="Name" /></label>
              <label><span>Email</span><input aria-label="Email" type="email" /></label>
              <label><span>Phone</span><input aria-label="Phone" type="tel" /></label>
              <label><span>Company name</span><input aria-label="Company name" /></label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Logo footer />
            <p>Vietnam&apos;s leading Health, Safety, and Environmental digital management software platform. Helping businesses achieve international standards.</p>
            <div className={styles.socials}>{[1, 2, 3].map((n) => <span key={n}><img src={asset(`icon-social-${n}.svg`)} alt="" /></span>)}</div>
          </div>
          <div><h3>Solutions</h3><a href="#solutions">Risk Management</a><a href="#solutions">Occupational Safety</a><a href="#solutions">Health Management</a><a href="#solutions">Environment (ESG)</a></div>
          <div><h3>Company</h3><a href="#top">About Us</a><a href="#customers">Customers</a><a href="#top">Blog & News</a><a href="#contact">Contact</a></div>
          <div><h3>Contact</h3><p><img src={asset("icon-location.svg")} alt="" />Ha Nam Building, 26/5 National Highway 13, Tay Quarter, Lai Thieu Ward, Ho Chi Minh City</p><p><img src={asset("icon-email-footer.svg")} alt="" />duy@atld.vn - kimlinh@atld.vn</p><p><img src={asset("icon-phone.svg")} alt="" />0917-267-397 (Mr.Linh)<br />0944-220-601 (Mr.Duy)<br />0345-062-815 (Ms.My)</p><p><img src={asset("icon-certification.svg")} alt="" />ISO 27001 Certified</p></div>
        </div>
        <div className={styles.footerBottom}><span>© 2025 HSE Provider. All rights reserved.</span><span>Terms of Service&nbsp;&nbsp;&nbsp;&nbsp; Privacy Policy</span></div>
      </footer>
    </div>
  );
}
