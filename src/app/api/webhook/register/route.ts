import { NextRequest } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) throw new Error("webhook secret is not defined");

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    process.env.NODE_ENV === "development" &&
      console.log("svix headers error!");
    return new Response("Something went wrong with the svix headers", {
      status: 405,
    });
  }
  const payload = JSON.stringify(await req.json());

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-signature": svix_signature,
      "svix-timestamp": svix_timestamp,
    }) as WebhookEvent;
  } catch (error) {
    process.env.NODE_ENV === "development" &&
      console.log("svix verification error!");
    return new Response("Something went wrong with the svix verification", {
      status: 405,
    });
  }

  const evtType = evt.type;

  if (evtType === "user.created") {
    try {
      const {
        id,
        email_addresses,
        primary_email_address_id,
        first_name,
        last_name,
      } = evt.data;
      const primaryEmailAddress = email_addresses.find(
        (email) => email.id === primary_email_address_id
      )?.email_address;
      const fullName = first_name + " " + last_name;

      if (!primaryEmailAddress) {
        process.env.NODE_ENV === "development" &&
          console.log("Primary email not found!");
        return new Response("Primary email not found", {
          status: 404,
        });
      }

      const user = await prisma.user.create({
        data: {
          id,
          email: primaryEmailAddress,
          name: fullName || "",
        },
      });
      return new Response(JSON.stringify(user), { status: 201 });
    } catch (error) {
      process.env.NODE_ENV === "development" &&
        console.log("prisma error!", error);
      return new Response("Something went wrong while creating user", {
        status: 405,
      });
    }
  } else {
    process.env.NODE_ENV === "development" && console.log("event type error!");
    return new Response("Something went wrong with the event type", {
      status: 405,
    });
  }
}
