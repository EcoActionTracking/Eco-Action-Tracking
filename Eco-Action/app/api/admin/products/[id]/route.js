import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import Product from "../../../../../models/Product";

export async function PUT(req, { params }) {
  const { id } = params;
  console.log("edit id", id);
  await dbConnect();

  try {
    const { name, description, price, category, images, stock_quantity } =
      await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, images, stock_quantity },
      { new: true }
    );

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating product", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await dbConnect();

  console.log("delete", params);

  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting product", error },
      { status: 500 }
    );
  }
}
