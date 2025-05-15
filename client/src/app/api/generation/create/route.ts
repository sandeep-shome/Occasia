import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface Payload {
  userId: string;
  name: string;
  generalPrompt: string;
  internalPrompt: string;
  duration: number;
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as Payload;
    const userData = await prisma.user.findUnique({
      where: {
        id: payload?.userId,
      },
    });
    if (!userData) {
      return new Response("User not found!", { status: 404 });
    }

    if (userData.tokens < 1) {
      return new Response("Ran out of tokens", { status: 405 });
    }

    const { id: speechId } = await prisma.speech.create({
      data: {
        userId: payload.userId,
        name: payload.name,
        internalPrompt: payload.internalPrompt,
        generalPrompt: payload.generalPrompt,
        duration: payload.duration,
      },
    });

    return new Response(JSON.stringify({ speechId }), { status: 201 });
  } catch (error) {
    return new Response("Something went wrong!", { status: 500 });
  }
}
