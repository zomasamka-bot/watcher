import { NextRequest, NextResponse } from "next/server";

const PI_API_BASE = "https://api.minepi.com/v2";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

/**
 * GET /api/payment/[paymentId]
 *
 * Fetches the current state of a payment from Pi Platform.
 * Used by the client to retrieve the real txid before completing.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  const { paymentId } = await params;

  if (!paymentId) {
    return NextResponse.json({ error: "Missing paymentId" }, { status: 400 });
  }

  const apiKey = process.env.PI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "PI_API_KEY environment variable is not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${PI_API_BASE}/payments/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: `Key ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch payment from Pi Platform", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to retrieve payment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
