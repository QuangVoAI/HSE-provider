"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopButton() {
  const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [editingForm, setEditingForm] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollableDistance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollableDistance > 0 && window.scrollY >= scrollableDistance / 3);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
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

  const canShow = visible && !editingForm;

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
