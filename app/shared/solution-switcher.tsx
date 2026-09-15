"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { getSolutionLinks, type SiteLocale } from "./solution-links";
import styles from "./solution-switcher.module.css";

export default function SolutionSwitcher({ locale, currentPath }: { locale: SiteLocale; currentPath: string }) {
  const links = getSolutionLinks(locale).filter(({ href }) => !href.startsWith(`${currentPath}?`));
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <nav className={styles.switcher} aria-label={locale === "vi" ? "Điều hướng giữa các giải pháp" : "Browse other solutions"}>
      <div className={`${styles.shell} ${open ? styles.open : ""}`}>
        <button className={styles.trigger} type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
          {locale === "vi" ? "Xem giải pháp khác" : "Explore other solutions"}
          <span className={styles.triggerIcon} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg></span>
        </button>
        <div className={styles.panel} id={panelId} aria-hidden={!open}>
          <div className={styles.panelInner}>{links.map(({ href, label }) => <Link href={href} tabIndex={open ? 0 : -1} key={href}>{label}<span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" /></svg></span></Link>)}</div>
        </div>
      </div>
    </nav>
  );
}
