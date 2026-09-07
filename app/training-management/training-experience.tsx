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

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % slides.length),
      4000,
    );
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];
  const activeImageName = getImageCaption(activeSlide.image, locale, activeSlide.title);

  return (
    <section className={`${healthStyles.workflowDemo} ${styles.trainingExperience}`} aria-labelledby="training-experience-title">
      <div className={healthStyles.container}>
        <div className={healthStyles.demoHeading}>
          <div><h2 className={styles.trainingExperienceTitle} id="training-experience-title">{title}</h2></div>
        </div>
        <div className={healthStyles.experienceViewer} role="tabpanel" aria-label={activeImageName}>
          <p className={healthStyles.experienceViewerCaption}>{activeImageName}</p>
          <div className={healthStyles.experienceImageFrame}>
            <img
              src={activeSlide.image}
              alt={activeImageName}
              className={healthStyles.experienceImage}
            />
          </div>
          {slides.length > 1 && <>
            <button type="button" className={`${healthStyles.experienceViewerNav} ${healthStyles.experienceViewerPrev}`} onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)} aria-label={locale === "en" ? "Previous image" : "Ảnh trước"}>‹</button>
            <button type="button" className={`${healthStyles.experienceViewerNav} ${healthStyles.experienceViewerNext}`} onClick={() => setActiveIndex((current) => (current + 1) % slides.length)} aria-label={locale === "en" ? "Next image" : "Ảnh tiếp theo"}>›</button>
          </>}
        </div>
      </div>
    </section>
  );
}
