import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({}); // Retrieve all users
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const data = await request.json();
    const newUser = await User.create(data); // Create a new user
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
