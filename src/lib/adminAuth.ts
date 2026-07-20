export const ADMIN_COOKIE = "og_admin";

// Deterministic session token from ADMIN_SECRET (HMAC). Works in edge + node.
export async function signToken(secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode("omegraduation-admin-v1"),
  );
  const bytes = new Uint8Array(sig);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

export async function isValidToken(
  token: string | undefined,
): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  if (!token || !secret) return false;
  return token === (await signToken(secret));
}
