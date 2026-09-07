"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./training-management.module.css";

export default function OverviewCarousel({ images, label, autoPlayMs = 4500 }: { images: string[]; label: string; autoPlayMs?: number }) {
  const [active, setActive] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const pointerDelta = useRef(0);

  useEffect(() => {
    if (images.length < 2 || autoPlayMs <= 0 || interacting) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), autoPlayMs);
    return () => window.clearInterval(timer);
  }, [autoPlayMs, images.length, interacting]);

  const finishSwipe = () => {
    if (pointerStart.current === null) return;
    if (Math.abs(pointerDelta.current) >= 42) {
      setActive((current) => pointerDelta.current < 0
        ? (current + 1) % images.length
        : (current - 1 + images.length) % images.length);
    }
    pointerStart.current = null;
    pointerDelta.current = 0;
    setInteracting(false);
  };

  return <div
    className={styles.overviewCarousel}
    aria-label={label}
    onTouchStart={(event) => {
      if (images.length < 2) return;
      pointerStart.current = event.touches[0]?.clientX ?? null;
      pointerDelta.current = 0;
      setInteracting(true);
    }}
    onTouchMove={(event) => {
      if (pointerStart.current !== null && event.touches[0]) pointerDelta.current = event.touches[0].clientX - pointerStart.current;
    }}
    onTouchEnd={finishSwipe}
    onTouchCancel={finishSwipe}
  >
    <div className={styles.overviewSlides} style={{ transform:`translateX(-${active * 100}%)` }}>
      {images.map((image,index) => <img src={image} alt={`${label} ${index + 1}`} key={image}/>) }
    </div>
    {images.length > 1 ? <>
      <button type="button" className={`${styles.overviewArrow} ${styles.overviewArrowLeft}`} aria-label="Previous" onClick={() => setActive((active - 1 + images.length) % images.length)}>‹</button>
      <button type="button" className={`${styles.overviewArrow} ${styles.overviewArrowRight}`} aria-label="Next" onClick={() => setActive((active + 1) % images.length)}>›</button>
      <div className={styles.overviewDots}>{images.map((image,index) => <button type="button" key={image} aria-label={`${label} ${index + 1}`} aria-current={index === active} onClick={() => setActive(index)}/>)}</div>
    </> : null}
  </div>;
}
