// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     products: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//       },
//     ],
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     shippingAddress: {
//       street: String,
//       city: String,
//       state: String,
//       country: String,
//       zipCode: String,
//       phoneNumber: String,
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["Credit Card", "PayPal", "Stripe"],
//       required: true,
//     },
//     stripePaymentId: {
//       type: String,
//       required: function () {
//         return this.paymentMethod === "Stripe";
//       },
//     },
//     stripePaymentStatus: {
//       type: String,
//       enum: ["pending", "succeeded", "failed"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
//////////////////

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
      phoneNumber: String,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "PayPal", "Stripe"],
      required: false,
    },
    stripePaymentId: {
      type: String,
      required: function () {
        return this.paymentMethod === "Stripe";
      },
    },
    stripePaymentStatus: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
