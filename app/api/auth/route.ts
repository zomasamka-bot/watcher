import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth
 * 
 * Authenticates user with Pi Network access token and creates/updates user session
 * 
 * Request body:
 * - pi_auth_token: string (Pi Network access token from Pi.authenticate())
 * 
 * Returns:
 * - id: User ID
 * - username: Pi username
 * - credits_balance: User's credit balance
 * - terms_accepted: Whether user accepted terms
 * - app_id: Application ID
 */
export async function POST(request: NextRequest) {
  console.log("[v0] POST /api/auth - Authentication request received");

  try {
    const body = await request.json();
    const { pi_auth_token } = body;

    console.log("[v0] Pi auth token received:", pi_auth_token ? "✓" : "✗");

    if (!pi_auth_token) {
      console.error("[v0] Missing pi_auth_token in request");
      return NextResponse.json(
        { error: "Missing pi_auth_token" },
        { status: 400 }
      );
    }

    // Verify token with Pi Network
    console.log("[v0] Verifying token with Pi Network...");
    const verifyResponse = await fetch(
      `https://api.minepi.com/v2/me`,
      {
        headers: {
          Authorization: `Bearer ${pi_auth_token}`,
        },
      }
    );

    if (!verifyResponse.ok) {
      console.error("[v0] Pi Network verification failed:", verifyResponse.status);
      return NextResponse.json(
        { error: "Invalid Pi Network token" },
        { status: 401 }
      );
    }

    const piUser = await verifyResponse.json();
    console.log("[v0] Pi user verified:", piUser.username);

    // For Watcher app (oversight only), we create a minimal user session
    // No database storage needed - this is a read-only verification app
    const userData = {
      id: piUser.uid,
      username: piUser.username,
      credits_balance: 0, // Not applicable for Watcher
      terms_accepted: true, // Oversight app doesn't require terms
      app_id: process.env.NEXT_PUBLIC_PI_APP_ID || "watcher-testnet",
    };

    console.log("[v0] User session created successfully for:", userData.username);

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("[v0] Authentication error:", error);
    return NextResponse.json(
      { 
        error: "Authentication failed", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
