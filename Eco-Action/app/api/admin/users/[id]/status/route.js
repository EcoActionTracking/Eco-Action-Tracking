import { NextResponse } from "next/server";
import dbConnect from "../../../../../../lib/mongodb";
import User from "../../../../../../models/User";
import { sendEmail } from "../../../../../../lib/mailer"; // Import the sendEmail function

export async function PUT(request, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const user = await User.findById(id);
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    const previousStatus = user.isActive; // Store the previous status
    user.isActive = !user.isActive; // Toggle the isActive status
    await user.save(); // Save the updated user

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
