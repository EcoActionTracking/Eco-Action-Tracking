import dbConnect from "./mongodb";
import Notification from "@/models/Notification";
import Challenge from "@/models/Challenges";

export async function checkNotifications() {
  await dbConnect();

  try {
    // Check for challenges with new participants
    const challenges = await Challenge.find({ participationCount: { $gt: 0 } });

    for (const challenge of challenges) {
      const existingNotification = await Notification.findOne({
        title: `New participants in ${challenge.title}`,
        isRead: false,
      });

      if (!existingNotification) {
        await Notification.create({
          title: `New participants in ${challenge.title}`,
          message: `${challenge.participationCount} new participants have joined the challenge "${challenge.title}"`,
        });
      }
    }
  } catch (error) {
    console.error("Error checking for notifications:", error);
  }
}
