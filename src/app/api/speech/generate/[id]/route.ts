import { generateMessageUsingGoogle } from "@/lib/googleAIClient";
import { generateMessageUsingHF } from "@/lib/inference";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: speechId } = await params;
    const speechData = await prisma.speech.findUnique({
      where: {
        id: speechId,
      },
    });
    if (!speechData) {
      return NextResponse.json(
        { error: "Speech data not found!" },
        { status: 404 }
      );
    }

    if (speechData.isFailed) {
      // Sending error if it's a failed request
      return NextResponse.json({ message: "Error: failed" }, { status: 418 });
    }

    if (speechData.result) {
      return NextResponse.json(speechData);
    }
    // implementing ai generation
    const {
      name,
      id,
      regenerationCount,
      userId,
      result,
      createdAt,
      updatedAt,
      ...payloadData
    } = speechData;

    const content = `Your task is to generate a compelling, coherent, and impactful speech based on the user's input. The user will provide:
                - A prompt or context: ${
                  payloadData.generalPrompt + " " + payloadData.internalPrompt
                }.
                - The desired language: ${payloadData.lang}.
                - The approximate word count or duration in number of words: ${
                  payloadData.duration * 120
                }`;

    const message = (await generateMessageUsingGoogle(content)) as string;

    // storing speech data

    const updatedSpeechData = await prisma.speech.update({
      where: {
        id: speechId,
      },
      data: {
        result: message,
      },
    });

    // deducting user token
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        tokens: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json(updatedSpeechData, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 405 });
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
