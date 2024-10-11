import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { createToken } from "../../../../utils/jwt";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await dbConnect();
  const body = await request.json();

  try {
    const { username, email, password } = body;
    console.log("Creating user with:", username, email, password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id);
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
    return NextResponse.json({
      success: true,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
