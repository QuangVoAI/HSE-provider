"use client";

import { useEffect, useState } from "react";
import styles from "./training-management.module.css";

export type TrainingSlide = { title: string; image: string };

export default function TrainingCarousel({ slides, previous, next }: { slides: TrainingSlide[]; previous: string; next: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return <div className={styles.carousel}>
    <div className={styles.carouselViewport}>
      <div className={styles.carouselTrack} style={{ transform: `translateX(-${active * 100}%)` }}>
        {slides.map((slide) => <figure key={slide.title}><img src={slide.image} alt={slide.title}/><figcaption>{slide.title}</figcaption></figure>)}
      </div>
    </div>
    <button className={`${styles.carouselArrow} ${styles.carouselPrevious}`} aria-label={previous} onClick={() => setActive((active - 1 + slides.length) % slides.length)}>‹</button>
    <button className={`${styles.carouselArrow} ${styles.carouselNext}`} aria-label={next} onClick={() => setActive((active + 1) % slides.length)}>›</button>
    <div className={styles.carouselDots}>{slides.map((slide, index) => <button key={slide.title} aria-label={slide.title} aria-current={index === active} onClick={() => setActive(index)}/>)}</div>
  </div>;
}
