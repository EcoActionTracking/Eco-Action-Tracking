// File: app/api/cart/route.js

import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Cart from "../../../models/Cart";
import Product from "../../../models/Product"; // Assuming you have a Product model
import { verifyToken } from "../../../utils/jwt";

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

export async function GET(req) {
  try {
    await dbConnect();
    const userId = await getUserIdFromToken(req);
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.productId"
    );
    return NextResponse.json(cart ? cart.items : []);
  } catch (error) {
    console.error("Error in GET /api/cart:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch cart" },
      { status: error.message.includes("authenticated") ? 401 : 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { productId, quantity } = await req.json();
    const userId = await getUserIdFromToken(req);

    // Validate product existence and quantity
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (quantity <= 0) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

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
    console.error("Error in POST /api/cart:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add item to cart" },
      { status: error.message.includes("authenticated") ? 401 : 500 }
    );
  }
}
///// Method to update quantity of a product in the cart
export async function PUT(req) {
  try {
    await dbConnect();
    const { productId, quantity } = await req.json();
    const userId = await getUserIdFromToken(req);

    if (quantity <= 0) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Product not found in cart" },
        { status: 404 }
      );
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    return NextResponse.json(cart.items);
  } catch (error) {
    console.error("Error in PUT /api/cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart item quantity" },
      { status: 500 }
    );
  }
}
