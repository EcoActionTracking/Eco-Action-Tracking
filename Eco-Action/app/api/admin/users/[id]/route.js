import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import sendEmail from "../../../../../lib/mailer"; // Import the sendEmail function

export async function GET(request, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const user = await User.findById(id);
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const data = await request.json();
    const user = await User.findById(id);

    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    // Update the user's isActive status and send an email
    const wasActive = user.isActive; // Store the previous state
    user.isActive = data.isActive; // Update the isActive status
    await user.save(); // Save the changes

    // Prepare email details
    const subject = user.isActive
      ? "Your account has been activated"
      : "Your account has been deactivated";
    const text = user.isActive
      ? `Hello ${user.username}, your account has been activated. You can now access the platform.`
      : `Hello ${user.username}, your account has been deactivated. If you have questions, please contact support.`;

    // Send email notification
    await sendEmail(user.email, subject, text);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
