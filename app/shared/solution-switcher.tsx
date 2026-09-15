import Link from "next/link";
import { getSolutionLinks, type SiteLocale } from "./solution-links";
import styles from "./solution-switcher.module.css";

export default function SolutionSwitcher({ locale, currentPath }: { locale: SiteLocale; currentPath: string }) {
  const links = getSolutionLinks(locale).filter(({ href }) => !href.startsWith(`${currentPath}?`));

  return (
    <nav className={styles.switcher} aria-label={locale === "vi" ? "Điều hướng giữa các giải pháp" : "Browse other solutions"}>
      <details>
        <summary>{locale === "vi" ? "Xem giải pháp khác" : "Explore other solutions"}<span aria-hidden="true">⌄</span></summary>
        <div>{links.map(({ href, label }) => <Link href={href} key={href}>{label}<span aria-hidden="true">→</span></Link>)}</div>
      </details>
    </nav>
  );
}
