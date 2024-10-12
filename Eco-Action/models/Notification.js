// import mongoose from "mongoose";

// const NotificationSchema = new mongoose.Schema(
//   {
//     challenge: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Challenges",
//       required: true,
//     },
//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Notification ||
//   mongoose.model("Notification", NotificationSchema);
////////////
/////////////////////
//////////
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    lastShownChallenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenges",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
