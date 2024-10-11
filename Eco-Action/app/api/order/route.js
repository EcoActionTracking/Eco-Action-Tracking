// app/api/order/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
import Cart from "@/app/models/Cart";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import stripe from "@/app/lib/stripe";

export async function POST(req) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      stripePaymentId,
    } = await req.json();

    let stripePaymentStatus = "pending";
    if (paymentMethod === "Stripe") {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        stripePaymentId
      );
      stripePaymentStatus =
        paymentIntent.status === "succeeded" ? "succeeded" : "failed";
    }

    const newOrder = new Order({
      user: session.user.id,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      stripePaymentId: paymentMethod === "Stripe" ? stripePaymentId : undefined,
      stripePaymentStatus:
        paymentMethod === "Stripe" ? stripePaymentStatus : undefined,
    });

    await newOrder.save();

    // Clear the user's cart after successful order
    await Cart.findOneAndUpdate(
      { user: session.user.id },
      { $set: { items: [] } }
    );

    return NextResponse.json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}
