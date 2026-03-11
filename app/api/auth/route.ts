import { NextRequest, NextResponse } from "next/server";

const PI_API_BASE = "https://api.minepi.com/v2";

/**
 * POST /api/auth
 *
 * Verifies the Pi access token server-side by calling Pi Platform /me.
 * Returns a minimal user session object used by the client auth context.
 */
export async function POST(request: NextRequest) {
  let pi_auth_token: string | undefined;

  try {
    const body = await request.json();
    pi_auth_token = body.pi_auth_token;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!pi_auth_token) {
    return NextResponse.json({ error: "Missing pi_auth_token" }, { status: 400 });
  }

  try {
    const verifyResponse = await fetch(`${PI_API_BASE}/me`, {
      headers: {
        Authorization: `Bearer ${pi_auth_token}`,
      },
    });

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { error: "Pi Network token verification failed" },
        { status: 401 }
      );
    }

    const piUser = await verifyResponse.json();

    return NextResponse.json(
      {
        id: piUser.uid,
        username: piUser.username,
        credits_balance: 0,
        terms_accepted: true,
        app_id: process.env.NEXT_PUBLIC_PI_APP_ID ?? "watcher",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
