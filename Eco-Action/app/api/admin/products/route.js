import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Product from "../../../../models/Product";

// GET: Fetch products
export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({ isDeleted: false });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const { name, description, price, category, images, stock_quantity } =
      await req.json();
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images,
      stock_quantity,
    });
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding product", error },
      { status: 500 }
    );
  }
}
