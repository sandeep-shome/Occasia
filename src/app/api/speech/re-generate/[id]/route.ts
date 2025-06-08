import { generateMessageUsingHF } from "@/lib/inference";
import { generateMessageUsingGoogle } from "@/lib/googleAIClient";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id: speechId } = await params;
    const body = await req.json();

    const speechData = await prisma.speech.findUnique({
      where: {
        id: speechId,
      },
    });

    if (!speechData) {
      return NextResponse.json(
        { message: "Speech data not found!" },
        { status: 404 }
      );
    }

    if (speechData.isFailed) {
      // Sending error if it's a failed request
      return NextResponse.json({ message: "Error: failed" }, { status: 418 });
    }

    // Regenerating message
    const content = `You are an expert speechwriter. Regenerate the following speech based on the user's suggestions. Ensure that the tone, flow, and structure remain coherent and natural. The final output should match the requested word limit and language.
                    - Original Speech: ${speechData.result}
                    - User Suggestions for Revision: ${body.suggestions}
                    - Word Limit: ${(body.duration as number) * 120} words
    `;

    const message = (await generateMessageUsingGoogle(content)) as string;

    const updatedSpeechData = await prisma.speech.update({
      where: {
        id: speechId,
      },
      data: {
        result: message,
        lang: body.lang,
        duration: body.duration,
        regenerationCount: {
          increment: 1,
        },
      },
    });

    if (speechData.regenerationCount > 0) {
      await prisma.user.update({
        where: {
          id: speechData.userId,
        },
        data: {
          tokens: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json(updatedSpeechData, { status: 201 });
    }

    return NextResponse.json(updatedSpeechData, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
