// import { NextResponse } from "next/server";
// import dbConnect from "../../../../../../lib/mongodb";
// import User from "../../../../../../models/User";
// import { sendEmail } from "../../../../../../lib/mailer"; // Import the sendEmail function

// export async function PUT(request, { params }) {
//   // Ensure `params` is correctly destructured to retrieve the `id`
//   const { id } = params;
//   await dbConnect();

//   try {
//     // Find user by the specified id
//     const user = await User.findById(id);
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 404 }
//       );
//     }

//     // Toggle the user's `isActive` status
//     const previousStatus = user.isActive;
//     user.isActive = !user.isActive;
//     await user.save(); // Save the updated user status

//     // Prepare email details based on the updated status
//     const subject = user.isActive
//       ? "Your account has been activated"
//       : "Your account has been deactivated";

//     const text = user.isActive
//       ? `Hello ${user.username}, your account has been activated. You can now access the platform.`
//       : `Hello ${user.username}, your account has been deactivated. If you have questions, please contact support.`;

//     // Send email notification to the user
//     await sendEmail(user.email, subject, text);

//     return NextResponse.json({ success: true, data: user });
//   } catch (error) {
//     console.error("Error in controller:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 400 }
//     );
//   }
// }
///////////////

import { NextResponse } from "next/server";
import dbConnect from "../../../../../../lib/mongodb";
import User from "../../../../../../models/User";
import { sendEmail } from "@/lib/mailer";
export async function PUT(request, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    user.isActive = !user.isActive;
    await user.save();

    const subject = user.isActive
      ? "Your account has been activated"
      : "Your account has been deactivated";

    const text = user.isActive
      ? `Hello ${user.username}, your account has been activated. You can now access the platform.`
      : `Hello ${user.username}, your account has been deactivated. If you have questions, please contact support.`;

    try {
      console.log("test");
      await sendEmail(user.email, subject, text);
      console.log("end");
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Continue execution even if email fails
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Error in controller:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
