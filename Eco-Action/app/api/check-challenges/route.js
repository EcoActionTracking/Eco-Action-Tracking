import { NextResponse } from "next/server";
import { checkChallenges } from "@/lib/checkChallenges";

export async function GET() {
  try {
    await checkChallenges();
    return NextResponse.json({
      message: "Challenges checked and notifications created if necessary",
    });
  } catch (error) {
    console.error("Error in check-challenges API:", error);
    return NextResponse.json(
      { error: "Failed to check challenges" },
      { status: 500 }
    );
  }
}
