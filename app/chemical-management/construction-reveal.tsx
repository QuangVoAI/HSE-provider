"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./chemical-management.module.css";

export default function ConstructionReveal({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.24, rootMargin: "0px 0px -42%" });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.underConstruction} aria-labelledby="chemical-coming-title">
      <div className={`${styles.constructionContent} ${styles.revealContent} ${isVisible ? styles.revealVisible : ""}`}>
        {children}
      </div>
    </section>
  );
}
