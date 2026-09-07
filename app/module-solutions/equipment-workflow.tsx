import type { PropsWithChildren } from "react";
import styles from "../contractor-management/contractor-management.module.css";
import moduleStyles from "./module-landing.module.css";

type IconProps = { strokeWidth?: number };
const Icon = ({ children, strokeWidth = 2 }: PropsWithChildren<IconProps>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
const EquipmentIcon = (props:IconProps) => <Icon {...props}><circle cx="5" cy="17" r="2"/><circle cx="14" cy="17" r="2"/><path d="M7 17h5M3 17v-6h13v6M5 11V7h4M9 11V5h4l3 6M22 15h-3V5M16 13h3"/></Icon>;
const UserSettingsIcon = (props:IconProps) => <Icon {...props}><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h2.5"/><circle cx="19" cy="19" r="2"/><path d="M19 15.5V17M19 21v1.5M22.03 17.25l-1.3.75M17.27 20l-1.3.75M15.97 17.25l1.3.75M20.73 20l1.3.75"/></Icon>;
const InspectionCalendarIcon = (props:IconProps) => <Icon {...props}><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M16 3v4M8 3v4M4 11h16M8 15h2v2H8z"/></Icon>;
const NotificationIcon = (props:IconProps) => <Icon {...props}><path d="M10 5a2 2 0 1 1 4 0 7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1"/></Icon>;
const ResultChecklistIcon = (props:IconProps) => <Icon {...props}><path d="M9.6 20H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8M14 19l2 2 4-4M9 8h4M9 12h2"/></Icon>;
const RecordsIcon = (props:IconProps) => <Icon {...props}><path d="M15 3v4a1 1 0 0 0 1 1h4M18 17h-7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4l5 5v7a2 2 0 0 1-2 2M16 17v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2"/></Icon>;
const AnalyticsIcon = (props:IconProps) => <Icon {...props}><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 1 1 0 4h-2a2 2 0 0 1-2-2M9 17v-5M12 17v-1M15 17v-3"/></Icon>;
const icons = [EquipmentIcon, UserSettingsIcon, InspectionCalendarIcon, NotificationIcon, ResultChecklistIcon, RecordsIcon, AnalyticsIcon] as const;

export default function EquipmentWorkflow({ title, steps, note }: { title: string; steps: readonly string[]; note: string }) {
  return <section className={styles.workflow} aria-labelledby="equipment-workflow-title">
    <div className={styles.workflowInner}>
      <h2 id="equipment-workflow-title">{title}</h2>
      <div className={styles.workflowStage}>
        <svg className={styles.workflowPath} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path className={`${styles.workflowLink} ${styles.link1}`} d="M22 25 H28"/>
          <path className={`${styles.workflowLink} ${styles.link2}`} d="M47 25 H53"/>
          <path className={`${styles.workflowLink} ${styles.link3}`} d="M72 25 H78"/>
          <path className={`${styles.workflowLink} ${styles.link4}`} d="M87.5 42 V58"/>
          <path className={`${styles.workflowLink} ${styles.link5}`} d="M78 75 H72"/>
          <path className={`${styles.workflowLink} ${styles.link6}`} d="M53 75 H47"/>
        </svg>
        <ol className={styles.workflowGrid}>{steps.map((step,index) => {
          const column = index < 4 ? index + 1 : 8 - index;
          const row = index < 4 ? 1 : 2;
          const Icon = icons[index];
          return <li className={styles.workflowCard} style={{gridColumn:column,gridRow:row}} key={step} tabIndex={0}>
            <div className={styles.workflowNode}><Icon strokeWidth={1.8}/><b>{String(index + 1).padStart(2,"0")}</b></div>
            <h3>{step}</h3>
          </li>;
        })}</ol>
        <aside className={moduleStyles.equipmentWorkflowNote}>
          <span className={moduleStyles.equipmentWorkflowNoteLine} aria-hidden="true"/>
          <p>{note}</p>
        </aside>
      </div>
    </div>
  </section>;
}
