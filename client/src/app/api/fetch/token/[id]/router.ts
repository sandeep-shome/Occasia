import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: userId } = await params;
  try {
    const data = await prisma.user.findUnique({
      select: {
        tokens: true,
      },
      where: {
        id: userId,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 405 });
    } else {
      return NextResponse.json(
        { message: "Error: something went wrong!" },
        { status: 500 }
      );
    }
  }
}
