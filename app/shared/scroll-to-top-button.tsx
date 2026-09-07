"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 160);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      type="button"
      className={`scrollToTopButton${visible ? " isVisible" : ""}`}
      onClick={scrollToTop}
      aria-label="Lên đầu trang"
      title="Lên đầu trang"
      tabIndex={visible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
