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

    // Regenerating message
    //TODO: implement AI message generation
    const message = "something after update";

    const updatedSpeechData = await prisma.speech.update({
      where: {
        id: speechId,
      },
      data: {
        result: message,
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

      return NextResponse.json(
        { message: "Speech regenerated" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Speech regenerated" },
      { status: 200 }
    );
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
