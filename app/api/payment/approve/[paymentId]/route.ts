import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  const paymentId = params.paymentId;

  console.log("[v0] POST /api/payment/approve/:paymentId called");
  console.log("[v0] Payment ID:", paymentId);

  try {
    // In a real implementation, this would approve the payment with Pi Network
    // For Step 10 testing, we simulate approval
    const approvalData = {
      paymentId,
      status: "approved",
      timestamp: new Date().toISOString(),
      app: "watcher.pi",
    };

    console.log("[v0] Payment approved:", approvalData);

    return NextResponse.json(approvalData, { status: 200 });
  } catch (error) {
    console.error("[v0] Payment approval failed:", error);
    return NextResponse.json(
      { error: "Payment approval failed" },
      { status: 500 }
    );
  }
}
