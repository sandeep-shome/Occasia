import { generateMessage } from "@/lib/inference";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id: speechId } = await params;
    const speechData = await prisma.speech.findUnique({
      where: {
        id: speechId,
      },
    });

    if (!speechData) {
      return NextResponse.json(
        { message: "Speech not found!" },
        { status: 404 }
      );
    }

    if (!speechData.isFailed && speechData.result) {
      return NextResponse.json(
        { message: "Speech already created!" },
        { status: 405 }
      );
    }

    const {
      name,
      id,
      liked,
      disliked,
      regenerationCount,
      userId,
      result,
      createdAt,
      updatedAt,
      ...payloadData
    } = speechData;
    const message = await generateMessage(payloadData);

    // storing speech data

    const updatedSpeechData = await prisma.speech.update({
      where: {
        id: speechId,
      },
      data: {
        result: message.content,
        isFailed: false,
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
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
