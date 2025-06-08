import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { ISpeechGenerateIdPayload } from "@/types";
export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as ISpeechGenerateIdPayload;
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

    const { id, name } = await prisma.speech.create({
      data: {
        userId: payload.userId,
        name: payload.name,
        internalPrompt: payload.internalPrompt,
        generalPrompt: payload.generalPrompt,
        duration: payload.duration,
        lang: payload.lang,
      },
    });

    return new Response(JSON.stringify({ id, name }), { status: 201 });
  } catch (error) {
    process.env.NODE_ENV === "development" && console.log(error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Something went wrong!", { status: 500 });
  }
}
