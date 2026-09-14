"use client";

import { useEffect, useState } from "react";
import healthStyles from "../health-management/health-management.module.css";
import { getImageCaption } from "../shared/image-caption";
import styles from "./training-management.module.css";

type TrainingExperienceProps = {
  title: string;
  slides: readonly { title: string; image: string }[];
  locale?: "vi" | "en";
};

export default function TrainingExperience({ title, slides, locale = title.startsWith("ELEVATING") ? "en" : "vi" }: TrainingExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % slides.length),
      4000,
    );
    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isLightboxOpen]);

  const activeSlide = slides[activeIndex];
  const activeImageName = getImageCaption(activeSlide.image, locale, activeSlide.title);

  return (
    <section className={`${healthStyles.workflowDemo} ${styles.trainingExperience}`} aria-labelledby="training-experience-title">
      <div className={healthStyles.container}>
        <div className={healthStyles.demoHeading}>
          <div style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}><h2 className={styles.trainingExperienceTitle} id="training-experience-title" style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
            {title.split("\n").map((line, index) => <span className={styles.trainingExperienceTitleLine} key={`${line}-${index}`}>{line}</span>)}
          </h2></div>
        </div>
        <div className={healthStyles.experienceViewer} role="tabpanel" aria-label={activeImageName}>
          <p className={healthStyles.experienceViewerCaption}>{activeImageName}</p>
          <button type="button" className={healthStyles.experienceImageButton} onClick={() => setIsLightboxOpen(true)} aria-label={locale === "en" ? "Open image full screen" : "Mở ảnh toàn màn hình"}>
            <img
              src={activeSlide.image}
              alt={activeImageName}
              className={healthStyles.experienceImage}
              loading="lazy"
              decoding="async"
            />
          </button>
          {slides.length > 1 && <>
            <button type="button" className={`${healthStyles.experienceViewerNav} ${healthStyles.experienceViewerPrev}`} onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)} aria-label={locale === "en" ? "Previous image" : "Ảnh trước"}>‹</button>
            <button type="button" className={`${healthStyles.experienceViewerNav} ${healthStyles.experienceViewerNext}`} onClick={() => setActiveIndex((current) => (current + 1) % slides.length)} aria-label={locale === "en" ? "Next image" : "Ảnh tiếp theo"}>›</button>
          </>}
        </div>
        {isLightboxOpen && <div className={healthStyles.experienceLightbox} role="dialog" aria-modal="true" aria-label={activeImageName} onClick={() => setIsLightboxOpen(false)}>
          <button type="button" className={healthStyles.experienceLightboxClose} onClick={() => setIsLightboxOpen(false)} aria-label={locale === "en" ? "Close full screen image" : "Đóng ảnh toàn màn hình"}>×</button>
          <img src={activeSlide.image} alt={activeImageName} className={healthStyles.experienceLightboxImage} onClick={(event) => event.stopPropagation()} />
          <p className={healthStyles.experienceLightboxCaption}>{activeImageName}</p>
        </div>}
      </div>
    </section>
  );
}
