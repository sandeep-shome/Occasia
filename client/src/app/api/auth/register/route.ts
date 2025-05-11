import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const user = await prisma.user.create({
    data: { name: "test_user1", email: "test_user1@gmail.com", tokens: 0 },
  });
  return new Response(JSON.stringify(user));
}

export async function GET(req: NextRequest) {
  return new Response("server is running");
}
