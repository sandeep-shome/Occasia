import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = "f27b8g398hf23p90fh9";
  return NextResponse.json(
    { message: "error: some error occurred!" },
    { status: 400 }
  );
}
