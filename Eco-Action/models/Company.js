import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company_name: {
      type: String,
      required: [true, "Company name is required"],
    },
    address: {
      type: String,
      required: [true, "Company address is required"],
    },
    contact_number: {
      type: String,
      required: [true, "Contact number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    website: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Company ||
  mongoose.model("Company", CompanySchema);
