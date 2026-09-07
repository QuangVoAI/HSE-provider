import type { ObjectId } from "mongodb";

import { mongoCollection } from "@/lib/mongodb";
import type { Lead, LeadInput } from "@/types/lead";

export function normalized(value: unknown) {
  return String(value ?? "").trim();
}

export async function findDuplicate(email: string, phoneNormalized: string) {
  const collection = await mongoCollection();
  return collection.findOne({
    $or: [{ emailNormalized: email }, ...(phoneNormalized ? [{ phoneNormalized }] : [])],
    status: { $ne: "rejected" },
  });
}

export async function insertLead(lead: Lead) {
  return (await mongoCollection()).insertOne(lead);
}

export async function updateLeadIntegrations(
  id: ObjectId,
  email: Lead["integration"]["email"],
  sheets: Lead["integration"]["sheets"],
) {
  await (await mongoCollection()).updateOne(
    { _id: id },
    { $set: { updatedAt: new Date(), "integration.email": email, "integration.sheets": sheets } },
  );
}

export function createLead(
  input: LeadInput,
  email: string,
  phone: string,
  phoneNormalized: string,
  duplicateOf?: string,
): Lead {
  const name = normalized(input.name);
  const now = new Date();
  return {
    name,
    email,
    phone,
    company: normalized(input.company),
    message: normalized(input.message),
    requestType: normalized(input.requestType),
    preferredDate: normalized(input.preferredDate),
    preferredTime: normalized(input.preferredTime),
    locale: normalized(input.locale) || "vi",
    source: normalized(input.source) || "website",
    nameNormalized: name.toLowerCase(),
    emailNormalized: email,
    phoneNormalized,
    ...(duplicateOf ? { duplicateOf } : {}),
    status: "new",
    createdAt: now,
    updatedAt: now,
    integration: { email: "pending", sheets: "pending" },
  };
}
