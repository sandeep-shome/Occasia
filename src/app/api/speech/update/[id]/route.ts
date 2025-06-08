import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id: speechId } = await params;
    const { message } = await req.json();

    await prisma.speech.update({
      where: {
        id: speechId,
      },
      data: {
        result: message,
      },
    });
    return NextResponse.json({ message: "Speech saved" });
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
