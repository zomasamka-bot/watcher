import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  const paymentId = params.paymentId;

  console.log("[v0] GET /api/payment/:paymentId called");
  console.log("[v0] Payment ID:", paymentId);

  try {
    // In a real implementation, this would fetch the payment from Pi Network
    // For Step 10 testing, we return mock payment data
    const paymentData = {
      identifier: paymentId,
      amount: 0.01,
      metadata: {
        test: true,
        purpose: "step10_verification",
        app: "watcher.pi",
      },
      transaction: {
        txid: `mock-txid-${paymentId}`,
      },
      status: "completed",
      timestamp: new Date().toISOString(),
    };

    console.log("[v0] Payment data retrieved:", paymentData);

    return NextResponse.json(paymentData, { status: 200 });
  } catch (error) {
    console.error("[v0] Failed to retrieve payment:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payment" },
      { status: 500 }
    );
  }
}
