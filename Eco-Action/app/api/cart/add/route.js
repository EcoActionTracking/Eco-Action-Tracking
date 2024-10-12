// File: app/api/cart/add/route.js

import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Cart from "../../../../models/Cart";
import { verifyToken } from "../../../../utils/jwt";

export async function POST(req) {
  try {
    await dbConnect();

    const { productId, quantity } = await req.json();
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    return NextResponse.json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error in POST /api/cart/add:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}
