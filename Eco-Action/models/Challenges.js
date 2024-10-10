import mongoose from "mongoose";

const ChallengesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Challenge title is required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Challenge description is required"],
    },
    targetValue: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      amount: {
        type: Number,
        required: true,
      },
      discountCode: {
        type: String,
        required: true,
      },
    },
    difficultyLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    participationCount: {
      type: Number,
      required: true,
      min: 0,
    },
    stages: [
      {
        stageNumber: {
          type: Number,
          required: true,
        },
        stageDescription: {
          type: String,
          required: true,
        },
        imageUrl: String,
      },
    ],
    image: String,
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Challenges ||
  mongoose.model("Challenges", ChallengesSchema);
