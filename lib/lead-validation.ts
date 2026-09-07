export const VIETNAM_MOBILE_PATTERN = String.raw`(?:\+84|0084|0)[ .\-]?[35789](?:[ .\-]?[0-9]){8}`;

export const VIETNAM_MOBILE_REGEX = /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeVietnamPhone(value: string) {
  return value.trim().replace(/[\s().-]/g, "").replace(/^0084/, "+84");
}

export function isValidVietnamPhone(value: string) {
  return new RegExp(`^(?:${VIETNAM_MOBILE_PATTERN})$`).test(value) &&
    VIETNAM_MOBILE_REGEX.test(normalizeVietnamPhone(value));
}

export function isValidEmail(value: string) {
  return value.length <= 254 && EMAIL_REGEX.test(value);
}

export function isValidPreferredDate(value: string) {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const selected = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(selected.getTime()) || selected.toISOString().slice(0, 10) !== value) return false;
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((p) => p.type === type)!.value;
  return value >= `${part("year")}-${part("month")}-${part("day")}`;
}

export function isValidPreferredTime(value: string) {
  return value === "" || /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function hasValidLeadTypes(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const body = value as Record<string, unknown>;
  const required = ["name", "email", "phone", "message"];
  const optional = ["company", "preferredDate", "preferredTime", "locale", "source", "requestType"];
  return required.every((key) => typeof body[key] === "string") &&
    optional.every((key) => body[key] === undefined || typeof body[key] === "string");
}
