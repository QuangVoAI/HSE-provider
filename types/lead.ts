export type LeadInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  requestType?: string;
  preferredDate?: string;
  preferredTime?: string;
  locale?: string;
  source?: string;
};

export type IntegrationStatus = "pending" | "sent" | "skipped" | "failed";

export const LEAD_STATUS_LABELS = {
  new: "Mới",
  contacted: "Đã liên hệ",
  scheduled: "Đã đặt lịch",
  quoted: "Báo giá",
  won: "Thành công",
  not_qualified: "Không phù hợp",
  // Kept for older records created before the workflow was introduced.
  rejected: "Không phù hợp",
} as const;

export type LeadStatus = keyof typeof LEAD_STATUS_LABELS;

export function leadStatusFromSheetValue(value: string): LeadStatus | null {
  const normalized = value.trim().toLocaleLowerCase("vi-VN");
  const match = Object.entries(LEAD_STATUS_LABELS).find(([, label]) =>
    label.toLocaleLowerCase("vi-VN") === normalized,
  );
  return match ? match[0] as LeadStatus : null;
}

export type Lead = LeadInput & {
  nameNormalized: string;
  emailNormalized: string;
  phoneNormalized: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
  duplicateOf?: string;
  reminder?: { lastSentAt: Date; sentCount: number };
  integration: { email: IntegrationStatus; sheets: IntegrationStatus };
};
