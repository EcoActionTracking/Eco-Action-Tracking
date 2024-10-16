import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/mongodb";
import UserChallenges from "../../../../models/UserChallenges";
// Helper function to get user ID from token
function getUserIdFromToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    throw new Error("Invalid token");
  }
  return decoded.id;
}

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { challengeId } = params;

    // استخراج Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // استخدام دالة getUserIdFromToken للتحقق من التوكن والحصول على userId
    const userId = getUserIdFromToken(token);

    // استخدام نموذج UserChallenges لإضافة بيانات التحدي
    await UserChallenges.create({
      userId,
      challengeId,
    });

    return NextResponse.json(
      { message: "Challenge added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error: " + error.message);
    return NextResponse.json(
      { message: "Error adding challenge", error: error.message },
      { status: 500 }
    );
  }
}

// app/api/userChallenges/[challengeId]/route.js

export async function PUT(request, { params }) {
  const { challengeId } = params;
  const body = await request.json();
  const { token } = body;
  console.log("token: ", token);
  const userId = getUserIdFromToken(token);
  console.log("userId: ", userId);
  try {
    await dbConnect();
    console.log("challenge id: ", challengeId);
    // Find the UserChallenge by ID
    const userChallenge = await UserChallenges.findOne({
      challengeId,
      userId,
    });
    console.log(userChallenge);
    if (!userChallenge) {
      return new Response(
        JSON.stringify({ message: "UserChallenge not found" }),
        {
          status: 404,
        }
      );
    }
    // Update the completion status if progress is 100
    userChallenge.completed = true;

    // Save the updated document
    await userChallenge.save();

    return new Response(JSON.stringify(userChallenge), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating UserChallenge:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PATCH(request, { params }) {
  const { challengeId } = params;
  const body = await request.json();
  console.log("PATCH body: ", body);
  const { token } = body;
  const userId = getUserIdFromToken(token);
  await dbConnect();
  const userChallenges = await UserChallenges.findOne({ challengeId, userId });
  if (userChallenges.completed) {
    return new Response(JSON.stringify(userChallenges), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ message: "Challenge not completed" }), {
    status: 404,
  });
}
