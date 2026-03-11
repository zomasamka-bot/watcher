import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/products
 * 
 * Returns empty products list for Watcher app
 * Watcher is an oversight/verification app with no products to sell
 */
export async function GET(request: NextRequest) {
  // Watcher app has no products - it's an oversight tool only
  return NextResponse.json({ products: [] }, { status: 200 });
}
