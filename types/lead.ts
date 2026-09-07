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

export type Lead = LeadInput & {
  nameNormalized: string;
  emailNormalized: string;
  phoneNormalized: string;
  status: "new" | "rejected";
  createdAt: Date;
  updatedAt: Date;
  duplicateOf?: string;
  integration: { email: IntegrationStatus; sheets: IntegrationStatus };
};
