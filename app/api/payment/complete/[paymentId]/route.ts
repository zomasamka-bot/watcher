import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  const paymentId = params.paymentId;

  console.log("[v0] POST /api/payment/complete/:paymentId called");
  console.log("[v0] Payment ID:", paymentId);

  try {
    const body = await request.json();
    const { txid } = body;

    console.log("[v0] Transaction ID:", txid);

    // In a real implementation, this would complete the payment with Pi Network
    // For Step 10 testing, we simulate completion
    const completionData = {
      paymentId,
      txid,
      status: "completed",
      timestamp: new Date().toISOString(),
      app: "watcher.pi",
    };

    console.log("[v0] Payment completed:", completionData);

    return NextResponse.json(completionData, { status: 200 });
  } catch (error) {
    console.error("[v0] Payment completion failed:", error);
    return NextResponse.json(
      { error: "Payment completion failed" },
      { status: 500 }
    );
  }
}
