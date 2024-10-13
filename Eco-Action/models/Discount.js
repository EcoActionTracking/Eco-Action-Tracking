import mongoose from "mongoose";
const DiscountSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    discountCode: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Discount ||
  mongoose.model("Discount", DiscountSchema);
