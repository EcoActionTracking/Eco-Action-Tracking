import dbConnect from "./mongodb";
import Notification from "@/models/Notification";
import Challenges from "@/models/Challenges";

export async function checkChallenges() {
  await dbConnect();

  try {
    // Get the newest challenge
    const newestChallenge = await Challenges.findOne().sort({ createdAt: -1 });

    if (newestChallenge) {
      // Check if a notification already exists for this challenge
      const existingNotification = await Notification.findOne({
        challenge: newestChallenge._id,
      });

      if (!existingNotification) {
        // Create a new notification
        await Notification.create({
          challenge: newestChallenge._id,
          isRead: false,
        });
        console.log(
          "New notification created for challenge:",
          newestChallenge.title
        );
      }
    }
  } catch (error) {
    console.error("Error checking for new challenges:", error);
  }
}
