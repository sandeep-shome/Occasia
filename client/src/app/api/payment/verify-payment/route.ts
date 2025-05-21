import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    tokens,
    userId,
  } = body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const isAuthentic = generatedSignature === razorpay_signature;

  if (!isAuthentic) {
    await prisma.subscription.create({
      data: {
        id: razorpay_order_id,
        userId,
        amount: tokens * 12,
        tokens,
        successful: false,
      },
    });
    return NextResponse.json(
      { message: "Unmatched signature!" },
      { status: 400 }
    );
  }

  try {
    await prisma.subscription.create({
      data: {
        id: razorpay_order_id,
        userId,
        amount: tokens * 12,
        tokens,
        successful: true,
      },
    });
    await prisma.user.update({
      where: { id: userId },
      data: {
        tokens: {
          increment: tokens,
        },
      },
    });
    return NextResponse.json({ message: "Token purchased", tokens });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong while updating user!" },
      { status: 400 }
    );
  }
};
