import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
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

    // implementing ai generation
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 405 });
    } else {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
