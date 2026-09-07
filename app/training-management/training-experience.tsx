"use client";

import { useEffect, useState } from "react";
import healthStyles from "../health-management/health-management.module.css";
import styles from "./training-management.module.css";

type TrainingExperienceProps = {
  title: string;
  slides: readonly { title: string; image: string }[];
  locale?: "vi" | "en";
};

const healthAsset = (name: string) => `/assets/health-management/${name}`;

export default function TrainingExperience({ title, slides, locale = title.startsWith("ELEVATING") ? "en" : "vi" }: TrainingExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (isLightboxOpen) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % slides.length),
      4000,
    );
    return () => window.clearInterval(timer);
  }, [slides.length, isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft") setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
      if (event.key === "ArrowRight") setActiveIndex((current) => (current + 1) % slides.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <section className={`${healthStyles.workflowDemo} ${styles.trainingExperience}`} aria-labelledby="training-experience-title">
      <div className={healthStyles.container}>
        <div className={healthStyles.demoHeading}>
          <div><h2 className={styles.trainingExperienceTitle} id="training-experience-title">{title}</h2></div>
        </div>
        <div className={healthStyles.tabletMockupContainer} role="tabpanel" aria-label={activeSlide.title}>
          <img src={healthAsset("hands-holding-ipad-white.jpg")} alt="" className={healthStyles.tabletBg} />
          <div
            className={healthStyles.tabletScreen}
            role="button"
            tabIndex={0}
            onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveIndex((current) => (current + 1) % slides.length);
              }
            }}
            aria-label={`${activeSlide.title}. Chuyển sang màn hình tiếp theo`}
          >
            <img
              src={activeSlide.image}
              alt={`${activeSlide.title}. Bấm để xem ảnh lớn`}
              className={healthStyles.tabletScreenImg}
              style={{ objectFit: "cover", objectPosition: "top center", cursor: "zoom-in" }}
              onClick={(event) => {
                event.stopPropagation();
                setIsLightboxOpen(true);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.stopPropagation();
                  setIsLightboxOpen(true);
                }
              }}
              role="button"
              tabIndex={0}
            />
            <button type="button" className={healthStyles.imageInteractionHint} onClick={(event) => { event.stopPropagation(); setIsLightboxOpen(true); }} aria-label={locale === "en" ? "Open image full screen" : "Mở ảnh chi tiết toàn màn hình"}>
              <span className={healthStyles.hintDesktop}>{locale === "en" ? "Click the image to view it full screen" : "Bấm vào ảnh để xem chi tiết toàn màn hình"}</span>
              <span className={healthStyles.hintMobile}>{locale === "en" ? "Tap the image to view it full screen" : "Chạm vào ảnh để xem chi tiết toàn màn hình"}</span>
            </button>
          </div>
        </div>
      </div>
      {isLightboxOpen && (
        <div className={healthStyles.imageLightbox} role="dialog" aria-modal="true" aria-label={activeSlide.title}>
          <button type="button" className={healthStyles.imageLightboxBackdrop} aria-label="Đóng ảnh" onClick={() => setIsLightboxOpen(false)} />
          <div className={healthStyles.imageLightboxPanel}>
            <button type="button" className={healthStyles.imageLightboxClose} onClick={() => setIsLightboxOpen(false)} aria-label="Đóng ảnh">×</button>
            <button type="button" className={`${healthStyles.imageLightboxNav} ${healthStyles.imageLightboxPrev}`} onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)} aria-label="Ảnh trước">‹</button>
            <img src={activeSlide.image} alt={activeSlide.title} className={healthStyles.imageLightboxImage} />
            <button type="button" className={`${healthStyles.imageLightboxNav} ${healthStyles.imageLightboxNext}`} onClick={() => setActiveIndex((current) => (current + 1) % slides.length)} aria-label="Ảnh tiếp theo">›</button>
            <p>{activeSlide.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
