import dbConnect from '../../../../lib/mongodb'; // Adjust the path as necessary
import Order from '../../../../models/Order'; // Adjust the path to your Order model
import { NextResponse } from 'next/server'; // Use Next.js response handling

// Connect to the database
export async function GET(req, { params }) {
  await dbConnect();

  const { userId } = params;
  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  // Extract pagination parameters from query string
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit; // Calculate the documents to skip

  try {
    // Find orders for the specific user with pagination
    const orders = await Order.find({ user: userId })
      .populate('products.product')
      .skip(skip) // Skip documents
      .limit(limit); // Limit the number of documents

    // Count total orders for pagination
    const totalOrders = await Order.countDocuments({ user: userId });

    // Return paginated results and pagination info
    return NextResponse.json({
      orders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
};
