"use client";

import { useEffect, useState } from "react";
import healthStyles from "../health-management/health-management.module.css";
import moduleStyles from "./module-landing.module.css";

export default function EnvironmentalWorkflow({
  title,
  steps,
  descriptions,
}: {
  title: string;
  steps: readonly string[];
  descriptions: readonly string[];
}) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveStep((current) => (current + 1) % steps.length),
      2500,
    );
    return () => window.clearInterval(timer);
  }, [steps.length]);

  return (
    <section className={`${healthStyles.workflow} ${moduleStyles.environmentalWorkflow}`} aria-labelledby="environmental-workflow-title">
      <div className={healthStyles.container}>
        <div className={`${healthStyles.workflowHeading} ${moduleStyles.environmentalWorkflowHeading}`}>
          <div className={healthStyles.workflowHeadingLeft}>
            <h2 id="environmental-workflow-title">{title}</h2>
            <div className={healthStyles.headingAccentLine} />
          </div>
        </div>

        <div className={`${healthStyles.workflowVisual} ${moduleStyles.environmentalWorkflowVisual}`}>
          <svg className={healthStyles.workflowSvg} viewBox="0 0 1000 410" preserveAspectRatio="none" aria-hidden="true">
            <path d="M -50 270 L 110 270 C 165 270, 165 140, 220 140 L 330 140 C 385 140, 385 270, 440 270 L 560 270 C 615 270, 615 140, 670 140 L 780 140 C 835 140, 835 270, 890 270 L 1050 270" className={healthStyles.svgBg} />
            <path d="M -50 270 L 110 270 C 165 270, 165 140, 220 140 L 330 140 C 385 140, 385 270, 440 270 L 560 270 C 615 270, 615 140, 670 140 L 780 140 C 835 140, 835 270, 890 270 L 1050 270" className={healthStyles.svgDot} />
          </svg>

          <svg className={healthStyles.mobileWorkflowSvg} viewBox="0 0 100 500" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 22 50 L 22 82 C 22 106, 78 94, 78 126 L 78 150 L 78 182 C 78 206, 22 194, 22 226 L 22 250 L 22 282 C 22 306, 78 294, 78 326 L 78 350 L 78 382 C 78 406, 22 394, 22 426 L 22 450" className={healthStyles.mobileSvgBg} />
            <path d="M 22 50 L 22 82 C 22 106, 78 94, 78 126 L 78 150 L 78 182 C 78 206, 22 194, 22 226 L 22 250 L 22 282 C 22 306, 78 294, 78 326 L 78 350 L 78 382 C 78 406, 22 394, 22 426 L 22 450" className={healthStyles.mobileSvgDot} />
            {[50, 150, 250, 350, 450].map((y, index) => (
              <circle key={y} cx={index % 2 === 0 ? 22 : 78} cy={y} r="2.2" className={healthStyles.mobileSvgNode} />
            ))}
          </svg>

          {steps.map((step, index) => {
            const isDown = index % 2 === 0;
            return (
              <div
                key={step}
                className={`${healthStyles.visualNode} ${moduleStyles.environmentalWorkflowNode} ${index === activeStep ? healthStyles.activeVisualNode : ""}`}
                style={{ left: `${index * 22.5 + 5}%`, top: isDown ? "270px" : "140px" }}
                onClick={() => setActiveStep(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") setActiveStep(index);
                }}
              >
                {index !== 0 && <div className={healthStyles.nodeDot} />}
                <div className={`${healthStyles.nodeBox} ${moduleStyles.environmentalWorkflowBox}`}>
                  <div className={`${healthStyles.nodeNum} ${moduleStyles.environmentalWorkflowNum}`}>{index + 1}</div>
                  <h3>{step}</h3>
                </div>
                <div className={`${healthStyles.nodeDesc} ${moduleStyles.environmentalWorkflowDesc} ${isDown ? healthStyles.descBottom : healthStyles.descTop}`}>
                  <p>{descriptions[index]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
