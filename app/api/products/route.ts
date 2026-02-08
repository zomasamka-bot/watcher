import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/products
 * 
 * Returns empty products list for Watcher app
 * Watcher is an oversight/verification app with no products to sell
 */
export async function GET(request: NextRequest) {
  console.log("[v0] GET /api/products - Products request received");

  // Watcher app has no products - it's an oversight tool only
  const response = {
    products: [],
  };

  console.log("[v0] Returning empty products list (oversight app)");

  return NextResponse.json(response, { status: 200 });
}
