import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string; userid: string } }
) => {
  const { id: speechId, userid } = await params;
  try {
    const speechData = await prisma.speech.findUnique({
      where: {
        id: speechId,
      },
    });

    if (speechData?.userId != userid) {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }

    await prisma.speech.delete({
      where: {
        id: speechId,
      },
    });

    return NextResponse.json({ message: "Speech deleted!" });
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
};
