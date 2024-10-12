import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/mongodb";
import Order from "../../../models/Order";
import Cart from "../../../models/Cart ";
import { verifyToken } from "@/utils/jwt";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();

  const token = req.cookies.get("token")?.value;
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { paymentMethodId, amount, products, shippingAddress } =
    await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      payment_method_types: ["card"],
      capture_method: "automatic",
    });

    const order = new Order({
      user: decodedToken.id,
      products,
      totalAmount: amount / 100, // Convert back to dollars
      shippingAddress,
      paymentMethod: "Stripe",
      stripePaymentId: paymentIntent.id,
      stripePaymentStatus: paymentIntent.status,
    });

    await order.save();

    // Clear the user's cart after successful order creation
    await Cart.findOneAndUpdate(
      { user: decodedToken.id },
      { $set: { items: [] } }
    );

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
