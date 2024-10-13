// // app/api/order/route.js
// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/app/lib/mongodb";
// import Order from "@/app/models/Order";
// import Cart from "@/app/models/Cart";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import stripe from "@/app/lib/stripe";

// export async function POST(req) {
//   try {
//     await connectToDatabase();
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const {
//       products,
//       totalAmount,
//       shippingAddress,
//       paymentMethod,
//       stripePaymentId,
//     } = await req.json();

//     let stripePaymentStatus = "pending";
//     if (paymentMethod === "Stripe") {
//       const paymentIntent = await stripe.paymentIntents.retrieve(
//         stripePaymentId
//       );
//       stripePaymentStatus =
//         paymentIntent.status === "succeeded" ? "succeeded" : "failed";
//     }

//     const newOrder = new Order({
//       user: session.user.id,
//       products,
//       totalAmount,
//       shippingAddress,
//       paymentMethod,
//       stripePaymentId: paymentMethod === "Stripe" ? stripePaymentId : undefined,
//       stripePaymentStatus:
//         paymentMethod === "Stripe" ? stripePaymentStatus : undefined,
//     });

//     await newOrder.save();

//     // Clear the user's cart after successful order
//     await Cart.findOneAndUpdate(
//       { user: session.user.id },
//       { $set: { items: [] } }
//     );

//     return NextResponse.json({
//       message: "Order created successfully",
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json(
//       { error: "Error creating order" },
//       { status: 500 }
//     );
//   }
// }
///////////////////

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
import Cart from "@/app/models/Cart";
import Discount from "@/app/models/Discount";
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
      discountInfo,
    } = await req.json();

    console.log("Received order data:", {
      products,
      totalAmount,
      paymentMethod,
      stripePaymentId,
      discountInfo,
    });

    let stripePaymentStatus = "pending";
    if (paymentMethod === "Stripe") {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          stripePaymentId
        );
        stripePaymentStatus = paymentIntent.status;
        console.log(`Stripe payment status: ${stripePaymentStatus}`);
      } catch (error) {
        console.error("Error retrieving Stripe payment intent:", error);
        return NextResponse.json(
          { error: "Error processing payment" },
          { status: 500 }
        );
      }
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
      discount: discountInfo
        ? {
            discountId: discountInfo.id,
            amount: discountInfo.amount,
            code: discountInfo.discountCode,
          }
        : undefined,
    });

    await newOrder.save();
    console.log("New order saved:", newOrder);

    // Clear the user's cart after successful order
    await Cart.findOneAndUpdate(
      { user: session.user.id },
      { $set: { items: [] } }
    );
    console.log("User cart cleared");

    // Update discount status if payment is successful
    if (discountInfo && stripePaymentStatus === "succeeded") {
      console.log(`Attempting to update discount with ID: ${discountInfo.id}`);
      try {
        const updatedDiscount = await Discount.findOneAndUpdate(
          { _id: discountInfo.id, isUsed: false },
          { $set: { isUsed: true } },
          { new: true, runValidators: true }
        );

        if (updatedDiscount) {
          console.log("Discount updated successfully:", updatedDiscount);
        } else {
          console.log("Discount not found or already used");
          // You might want to handle this case, perhaps by notifying the user or admin
        }
      } catch (error) {
        console.error("Error updating discount:", error);
        // Consider how you want to handle this error. You might want to:
        // - Notify an admin
        // - Add a flag to the order indicating the discount needs manual review
        // - Attempt to retry the update
      }
    } else if (discountInfo) {
      console.log(
        `Payment not succeeded or no discount info. Payment status: ${stripePaymentStatus}`
      );
    }

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
