import { google } from "googleapis";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { createToken } from "../../../../../utils/jwt"; // Adjust this import path as needed
import dbConnect from "../../../../../lib/mongodb"; // Adjust this import path as needed

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/api/auth/google/callback`
);

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  // Absolute URL for redirection in case of missing code
  const redirectUrl = `${request.nextUrl.origin}/login?error=GoogleAuthFailed`;

  if (!code) {
    return NextResponse.redirect(redirectUrl);
  }

  try {
    await dbConnect(); // Connect to MongoDB

    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Retrieve user information from Google
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();

    let user = await User.findOne({ email: data.email });

    // If user doesn't exist, create a new one
    if (!user) {
      user = new User({
        username: data.name.replace(/\s+/g, "").toLowerCase(),
        email: data.email,
        googleId: data.id, // Store Google ID for Google-based logins
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10), // Generate a random password
        image: data.picture,
        role: "User",
        isActive: true,
      });
      await user.save();
    }

    // Update user's image if it has changed
    if (user.image !== data.picture) {
      user.image = data.picture;
      await user.save();
    }

    // Create a user object for token creation
    const userObject = user.toObject();
    delete userObject.password;

    // Generate a JWT token
    const token = createToken(userObject);

    // Store the access token in cookies
    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    // Redirect to the home page after successful login
    return NextResponse.redirect(request.nextUrl.origin);
  } catch (error) {
    console.error("Error in Google callback:", error);
    // Redirect with an error message in case of an exception
    return NextResponse.redirect(redirectUrl);
  }
}
