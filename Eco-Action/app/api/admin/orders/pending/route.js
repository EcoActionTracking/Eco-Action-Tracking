// app/api/orders/pending/route.js
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User"; // Import User model
import Product from "@/models/Product"; // Import Product model

export async function GET(req) {
  await dbConnect();
  try {
    // Fetch pending orders with populated user and products
    const orders = await Order.find({ orderStatus: false })
      .populate("user") // Populating user to get all user data
      .populate({
        path: "products.product", // Populating products.product to get product data
        model: Product, // Specify the model for population
      });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch pending orders" }),
      { status: 500 }
    );
  }
}
