// File: app/api/cart/[productId]/route.js

import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Cart from "../../../../models/Cart";
import { verifyToken } from "../../../../utils/jwt";

// Helper function to get user ID from token
async function getUserIdFromToken(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    throw new Error("Not authenticated");
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    throw new Error("Invalid token");
  }
  return decoded.id;
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const userId = await getUserIdFromToken(req);
    const { productId } = params;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Filter out the product from the cart
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    return NextResponse.json(cart.items);
  } catch (error) {
    console.error("Error in DELETE /api/cart/[productId]:", error);
    return NextResponse.json(
      { error: "Failed to delete item from cart" },
      { status: 500 }
    );
  }
}
