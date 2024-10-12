import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/Product";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({ isDeleted: false });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error in GET /api/products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/******************** */
export async function POST(req) {
  await dbConnect(); // Connect to your database

  const body = await req.json(); // Parse the request body

  try {
    const product = await Product.create(body); // Create a new product
    return new Response(JSON.stringify({ success: true, data: product }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
}
