export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function GET() {
  const s = await auth0.getSession();

  return NextResponse.json({
    hasSession: !!s,
    hasAccessToken: !!s?.accessToken && typeof s.accessToken === "string",
    tokenType: s?.tokenType ?? null,
    scope: s?.scope ?? null,
  });
}