import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Notification from "@/models/Notification";
import Challenges from "@/models/Challenges";

export async function GET() {
  await dbConnect();

  try {
    let notification = await Notification.findOne().sort({ createdAt: -1 });

    if (!notification) {
      notification = await Notification.create({});
    }

    const challenges = await Challenges.find({
      _id: { $ne: notification.lastShownChallenge },
    }).sort({ createdAt: -1 });

    if (challenges.length > 0) {
      const randomIndex = Math.floor(Math.random() * challenges.length);
      const selectedChallenge = challenges[randomIndex];

      notification.lastShownChallenge = selectedChallenge._id;
      await notification.save();

      console.log("Fetched challenge:", selectedChallenge);
      return NextResponse.json([{ challenge: selectedChallenge }]);
    } else {
      console.log("No new challenges to show");
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  await dbConnect();

  try {
    const { id } = await request.json();
    await Notification.findByIdAndUpdate(id, { isRead: true });
    return NextResponse.json({ message: "Notification marked as read" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    );
  }
}
