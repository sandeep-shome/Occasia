import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { v4 } from "uuid";

export const POST = async (req: NextRequest) => {
  const { tokens } = await req.json();
  const amount = tokens * 12;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `order_${v4()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order, { status: 201 });
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
