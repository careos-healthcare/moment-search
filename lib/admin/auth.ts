import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ms_admin";

function adminToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`ms-admin:${password}`).digest("hex");
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = adminToken();
  if (!expected) return false;

  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === expected;
}

export function getAdminCookieValue(): string | null {
  return adminToken();
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export { COOKIE_NAME };
