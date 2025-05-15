import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = "f27b8g398hf23p90fh9";
  return new Response(JSON.stringify({ id }), { status: 201 });
}
