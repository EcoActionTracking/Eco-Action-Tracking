import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { verifyToken } from "@/utils/jwt";

export async function GET(req) {
  await dbConnect();

  const token = req.cookies.get("token")?.value;
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const latestOrder = await Order.findOne({ user: decodedToken.id })
      .sort({ createdAt: -1 })
      .populate("products.product");

    if (!latestOrder) {
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(latestOrder);
  } catch (error) {
    console.error("Error fetching latest order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
