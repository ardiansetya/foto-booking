import { NextResponse } from "next/server";
import { ADMIN_COOKIE, signToken } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  const expected = process.env.ADMIN_PASSWORD;
  if (!secret || !expected) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if (password !== expected) {
    return NextResponse.json({ error: "wrong_password" }, { status: 401 });
  }

  const token = await signToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
