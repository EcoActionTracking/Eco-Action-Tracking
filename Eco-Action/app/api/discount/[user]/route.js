import dbConnect from "../../../../lib/mongodb"; 
import Discount from "../../../../models/Discount"; 
import { NextResponse } from 'next/server'; 

export async function GET(req, { params }) {
  const { user } = params;

  await dbConnect(); 

  try {
    const discounts = await Discount.find({ user, isUsed: false });

    return NextResponse.json({
      discounts, 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching discounts:", error); 
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
