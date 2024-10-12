import mongoose from "mongoose";

const UserChallengesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Challenges",
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    image: [String],
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserChallenges ||
  mongoose.model("UserChallenges", UserChallengesSchema);
