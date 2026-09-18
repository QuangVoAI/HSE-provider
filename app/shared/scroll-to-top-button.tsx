"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopButton() {
  const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [obstructingContentVisible, setObstructingContentVisible] = useState(false);
  const [editingForm, setEditingForm] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 160);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [pathname]);

  useEffect(() => {
    setObstructingContentVisible(false);
    const targets = Array.from(document.querySelectorAll("form, [class*='carousel' i]"));
    if (!targets.length) return;

    const visibleTargets = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? visibleTargets.add(entry.target) : visibleTargets.delete(entry.target));
      setObstructingContentVisible(visibleTargets.size > 0);
    }, { threshold: 0.08 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement && event.target.matches("input, textarea, select")) setEditingForm(true);
    };
    const onFocusOut = () => setEditingForm(false);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const canShow = visible && !obstructingContentVisible && !editingForm;

  return (
    <button
      type="button"
      className={`scrollToTopButton${canShow ? " isVisible" : ""}`}
      onClick={scrollToTop}
      aria-label="Lên đầu trang"
      title="Lên đầu trang"
      tabIndex={canShow ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
