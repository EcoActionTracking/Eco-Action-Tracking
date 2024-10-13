// app/api/orders/[id]/route.js
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function PATCH(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    // Log the id to ensure it's being received correctly
    console.log("Updating order status for ID:", id);

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: true },
      { new: true } // Return the updated order
    );

    // Check if the order was found and updated
    if (!order) {
      console.error("Order not found for ID:", id);
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    // Log success for debugging purposes
    console.log("Order status updated successfully for ID:", id, order);

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error("Error updating order status:", error);

    return new Response(
      JSON.stringify({ error: "Failed to update order status" }),
      { status: 500 }
    );
  }
}
