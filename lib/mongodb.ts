import { MongoClient } from "mongodb";
import type { Collection } from "mongodb";

import type { Lead } from "@/types/lead";

const globalForLeads = globalThis as typeof globalThis & { __hseMongo?: MongoClient };

function env(name: string) {
  return process.env[name]?.trim() || "";
}

export function isMongoConfigured() {
  return Boolean(env("MONGODB_URI") && env("MONGODB_DB"));
}

export async function mongoCollection(): Promise<Collection<Lead>> {
  if (!isMongoConfigured()) throw new Error("MONGODB_NOT_CONFIGURED");

  const client = globalForLeads.__hseMongo ?? new MongoClient(env("MONGODB_URI"));
  if (!globalForLeads.__hseMongo) {
    await client.connect();
    globalForLeads.__hseMongo = client;
  }

  const collection = client.db(env("MONGODB_DB")).collection<Lead>(env("MONGODB_COLLECTION") || "leads");
  await collection.createIndex({ emailNormalized: 1 });
  await collection.createIndex({ phoneNormalized: 1 });
  await collection.createIndex({ status: 1, createdAt: -1 });
  return collection;
}
