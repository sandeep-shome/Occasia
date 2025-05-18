import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: userId } = await params;
  try {
    const data = await prisma.speech.findMany({
      select: {
        name: true,
        id: true,
      },
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(data);
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
