import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function GET() {
  await dbConnect();

  try {
    const newNotification = await Notification.create({
      title: "Test Notification",
      message: "This is a test notification",
      isRead: false,
    });

    return NextResponse.json({
      message: "Test notification created",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error creating test notification:", error);
    return NextResponse.json(
      { error: "Failed to create test notification" },
      { status: 500 }
    );
  }
}
