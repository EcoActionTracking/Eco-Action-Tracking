import mongoose from "mongoose";

const BadgesSchema = new mongoose.Schema(
  {
    badge_name: {
      type: String,
      required: [true, "Badge name is required"],
      trim: true,
      index: true,
    },
    description: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Badge || mongoose.model("Badge", BadgesSchema);
