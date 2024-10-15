import { verifyToken } from "@/utils/jwt";
import { UserChallenges } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log("test");
  const { id, userId } = params;
  console.log("id: ", id, "userId: ", userId);
  const decoded = verifyToken(userId);

  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userChallenges = await UserChallenges.findOne({
    userId: decoded.id,
    challengeId: id,
  });
  return NextResponse.json({ userChallenges }, { status: 200 });
}

// POST
export async function POST(req, { params }) {
  const { id, userId } = params;
  const decoded = verifyToken(userId);

  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let userChallenges = await UserChallenges.findOne({
    userId: decoded.id,
    challengeId: id,
  });

  if (userChallenges) {
    userChallenges.progress += 1;
  }

  await userChallenges.save();
  return NextResponse.json({ userChallenges }, { status: 201 });
}
