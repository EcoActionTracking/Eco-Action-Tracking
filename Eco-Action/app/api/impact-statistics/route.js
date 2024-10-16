import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import UserChallenges from "@/models/UserChallenges";

export async function GET() {
  await dbConnect();

  try {
    const completedChallenges = await UserChallenges.countDocuments({
      completed: true,
      isDeleted: false,
    });
    const totalCarbonReduced = (completedChallenges * 2.1).toFixed(2); // 2 kg per completed challenge

    return NextResponse.json({
      success: true,
      statistics: {
        totalCarbonReduced: parseFloat(totalCarbonReduced), // Convert back to float
        totalCompletedChallenges: completedChallenges,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
