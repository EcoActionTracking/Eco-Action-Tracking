import { NextResponse } from "next/server";
import Stripe from "stripe";
import { buffer } from "micro";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  await dbConnect();

  const buf = await buffer(req);
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    try {
      const order = await Order.findOne({ stripePaymentId: paymentIntent.id });
      if (order) {
        order.stripePaymentStatus = "succeeded";
        await order.save();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
