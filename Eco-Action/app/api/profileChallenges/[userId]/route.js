import dbConnect from "../../../../lib/mongodb"; 
import UserChallenges from "../../../../models/UserChallenges"; 
import Challenges from "../../../../models/Challenges"; 
import { NextResponse } from 'next/server'; 

export async function GET(req, { params }) {


  const { userId } = params;

  await dbConnect(); 


  // Extract query parameters for pagination
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1; // Default to page 1
  const limit = parseInt(searchParams.get('limit')) || 2; // Default to 10 items per page

  // Calculate the number of challenges to skip
  const skip = (page - 1) * limit;

  try {
    // Fetch user challenges by userId with pagination
    const userChallenges = await UserChallenges.find({ userId, isDeleted: false })
      .populate('challengeId')
      .skip(skip)
      .limit(limit);

    // Count total challenges for this user (without pagination)
    const totalChallenges = await UserChallenges.countDocuments({ userId, isDeleted: false });

    // If no challenges are found
    if (!userChallenges.length) {
      return NextResponse.json({ message: "No challenges found for this user" }, { status: 404 });
    }

    // Return the fetched challenges along with pagination info
    return NextResponse.json({
      userChallenges,
      totalChallenges,
      totalPages: Math.ceil(totalChallenges / limit),
      currentPage: page,
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
