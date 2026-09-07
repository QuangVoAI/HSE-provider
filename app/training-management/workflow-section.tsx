import styles from "./training-management.module.css";

type WorkflowSectionProps = {
  title: string;
  items: readonly (readonly [string, string])[];
  stepLabel: string;
};

export default function WorkflowSection({ title, items, stepLabel }: WorkflowSectionProps) {
  return (
    <section className={styles.process}>
      <header><h2>{title}</h2></header>
      <div className={styles.processJourney}>
        <svg className={styles.processPath} viewBox="0 0 1160 560" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="trainingRoadGradient" x1="0" y1="0" x2="1160" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#034985"/><stop offset=".34" stopColor="#075bb9"/><stop offset=".68" stopColor="#087fd0"/><stop offset="1" stopColor="#19b9d6"/>
            </linearGradient>
          </defs>
          <path className={styles.processRoadShadow} d="M96 340 C155 340 185 185 257 185 C330 185 350 340 419 340 C485 340 510 185 580 185 C650 185 675 340 741 340 C810 340 835 185 903 185 C970 185 995 340 1064 340 C1085 340 1105 340 1125 340" />
          <path className={styles.processRoad} stroke="url(#trainingRoadGradient)" d="M96 340 C155 340 185 185 257 185 C330 185 350 340 419 340 C485 340 510 185 580 185 C650 185 675 340 741 340 C810 340 835 185 903 185 C970 185 995 340 1064 340 C1085 340 1105 340 1125 340" />
          <path className={styles.processRoadLine} d="M96 340 C155 340 185 185 257 185 C330 185 350 340 419 340 C485 340 510 185 580 185 C650 185 675 340 741 340 C810 340 835 185 903 185 C970 185 995 340 1064 340 C1085 340 1105 340 1125 340" />
        </svg>
        {items.map((item,index) => (
          <article
            className={`${styles.processStep} ${index % 2 === 1 ? styles.processStepTop : styles.processStepBottom}`}
            key={item[0]}
            tabIndex={0}
            aria-label={`${stepLabel} ${index + 1}: ${item[0]}`}
          >
            <span className={styles.processNode}><b>{String(index+1).padStart(2,"0")}</b></span>
            <div className={styles.processText}><h3>{item[0]}</h3><p>{item[1]}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
