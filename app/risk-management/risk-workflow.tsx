import {
  ClipboardCheck,
  FolderKanban,
  GraduationCap,
  History,
  ScanSearch,
  ShieldCheck,
  Sigma,
  SlidersHorizontal,
} from "lucide-react";
import styles from "./risk-management.module.css";

type Props = {
  title: string;
  steps: readonly string[];
  controlStep: string;
  outputs: readonly string[];
};

const stepIcons = [SlidersHorizontal, Sigma, ClipboardCheck, ScanSearch, ShieldCheck] as const;
const outputIcons = [History, GraduationCap, FolderKanban] as const;

export default function RiskWorkflow({ title, steps, controlStep, outputs }: Props) {
  const allSteps = [...steps, controlStep];

  return (
    <section className={styles.workflow} aria-labelledby="risk-workflow-title">
      <div className={styles.workflowInner}>
        <header className={styles.workflowHeader}>
          <h2 id="risk-workflow-title">{title}</h2>
          <span />
        </header>

        <div className={styles.workflowCanvas}>
          <svg className={styles.workflowLines} viewBox="0 0 1600 760" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id="risk-line-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <linearGradient id="risk-flow-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop className={styles.flowStop1} offset="0" stopColor="#0b3f91" />
                <stop className={styles.flowStop2} offset=".38" stopColor="#034985" />
                <stop className={styles.flowStop3} offset=".7" stopColor="#075bb9" />
                <stop className={styles.flowStop4} offset="1" stopColor="#0870d1" />
              </linearGradient>
            </defs>

            <g className={styles.lineGlow}>
              <path d="M0 150 C82 126 128 126 172 148 C270 196 312 286 292 350 C279 410 326 474 420 520" />
              <path d="M392 478 C486 515 526 447 532 369 C540 286 580 246 630 230" />
              <path d="M756 246 C840 276 866 352 838 426 C818 480 830 512 874 528" />
              <path d="M1005 530 C1070 501 1081 444 1049 382 C1017 319 1045 270 1110 242" />
              <path d="M1228 226 C1292 207 1324 209 1370 215" />
              <path d="M1227 238 C1289 267 1314 315 1370 340" />
              <path d="M1212 255 C1253 364 1292 445 1370 465" />
            </g>
            <g className={styles.lineCore}>
              <path id="risk-flow-12" d="M0 150 C82 126 128 126 172 148 C270 196 312 286 292 350 C279 410 326 474 420 520" />
              <path id="risk-flow-23" d="M392 478 C486 515 526 447 532 369 C540 286 580 246 630 230" />
              <path id="risk-flow-34" d="M756 246 C840 276 866 352 838 426 C818 480 830 512 874 528" />
              <path id="risk-flow-45" d="M1005 530 C1070 501 1081 444 1049 382 C1017 319 1045 270 1110 242" />
              <path d="M1228 226 C1292 207 1324 209 1370 215" />
              <path d="M1227 238 C1289 267 1314 315 1370 340" />
              <path d="M1212 255 C1253 364 1292 445 1370 465" />
            </g>
            <g className={styles.lineMotion}>
              <path d="M0 150 C82 126 128 126 172 148 C270 196 312 286 292 350 C279 410 326 474 420 520" />
              <path d="M392 478 C486 515 526 447 532 369 C540 286 580 246 630 230" />
              <path d="M756 246 C840 276 866 352 838 426 C818 480 830 512 874 528" />
              <path d="M1005 530 C1070 501 1081 444 1049 382 C1017 319 1045 270 1110 242" />
              <path d="M1228 226 C1292 207 1324 209 1370 215" />
              <path d="M1227 238 C1289 267 1314 315 1370 340" />
              <path d="M1212 255 C1253 364 1292 445 1370 465" />
            </g>
          </svg>

          <div className={styles.workflowNodes}>
            {allSteps.map((label, index) => {
              const Icon = stepIcons[index];
              return (
                <article className={`${styles.workflowNode} ${styles[`workflowNode${index + 1}`]}`} key={label}>
                  <b>{index + 1}</b>
                  <span className={styles.nodeIconWrap}>
                    {Icon ? <Icon aria-hidden="true" strokeWidth={1.75} /> : null}
                  </span>
                  <h3>{label}</h3>
                </article>
              );
            })}
          </div>

          <div className={styles.workflowOutputs}>
            {outputs.map((label, index) => {
              const Icon = outputIcons[index];
              return (
                <article className={styles.workflowOutput} key={label}>
                  <span className={styles.outputIconWrap}><Icon aria-hidden="true" strokeWidth={1.8} /></span>
                  <h3>{label}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
