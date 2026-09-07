import styles from "./module-landing.module.css";
import riskStyles from "../risk-management/risk-management.module.css";

type Props = {
  title: string;
  steps: readonly string[];
  note?: string;
};

export default function ModuleWorkflow({ title, steps, note }: Props) {
  return <section className={`${riskStyles.workflow} ${styles.moduleWorkflow}`} aria-labelledby="module-workflow-title">
    <div className={riskStyles.workflowInner}>
      <header className={riskStyles.workflowHeader}>
        <h2 id="module-workflow-title">{title}</h2>
        <span />
      </header>
      <div className={styles.moduleWorkflowCanvas}>
        <ol className={styles.moduleWorkflowSteps}>
          {steps.map((step, index) => <li key={step}>
            <b>{index + 1}</b>
            <h3>{step}</h3>
          </li>)}
        </ol>
        {note ? <div className={styles.moduleWorkflowNote}><svg className={styles.moduleWorkflowArrow} viewBox="0 0 24 16" aria-hidden="true"><path d="M3 3l9 9 9-9"/></svg><p>{note}</p></div> : null}
      </div>
    </div>
  </section>;
}
