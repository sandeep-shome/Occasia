import { NextRequest } from "next/server";

interface Payload {
  userId: string;
  name: string;
  generalPrompt: string;
  internalPrompt: string;
  duration: number;
}

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as Payload;

  if (!payload) {
    return new Response("payload not found!", { status: 405 });
  }
}
