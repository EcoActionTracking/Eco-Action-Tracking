// // File: app/api/apply-promo/route.js
// import { NextResponse } from "next/server";
// import dbConnect from "../../../lib/mongodb";
// import Challenges from "../../../models/Challenges";
// import Discount from "../../../models/Discount";
// import { verifyToken } from "../../../utils/jwt";
// ///////////////////////////////
// // export async function POST(req) {
// //   try {
// //     await dbConnect();
// //     const { promoCode } = await req.json();

// //     // Get user ID from token
// //     const token = req.cookies.get("token")?.value;
// //     if (!token) {
// //       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
// //     }
// //     const decoded = verifyToken(token);
// //     if (!decoded) {
// //       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
// //     }
// //     const userId = decoded.id;

// //     // Find the challenge with the matching discount code
// //     const challenge = await Challenges.findOne({
// //       "discount.discountCode": promoCode,
// //     });
// //     if (!challenge) {
// //       return NextResponse.json(
// //         { error: "Invalid promo code" },
// //         { status: 400 }
// //       );
// //     }

// //     // Check if the discount has already been used by this user
// //     const existingDiscount = await Discount.findOne({
// //       user: userId,
// //       discountCode: promoCode,
// //       isUsed: true,
// //     });

// //     if (existingDiscount) {
// //       return NextResponse.json(
// //         { error: "Promo code already used" },
// //         { status: 400 }
// //       );
// //     }

// //     // Create or update the discount for this user
// //     const discount = await Discount.findOneAndUpdate(
// //       { user: userId, discountCode: promoCode },
// //       {
// //         amount: challenge.discount.amount,
// //         isUsed: true,
// //       },
// //       { upsert: true, new: true }
// //     );

// //     return NextResponse.json({ discount });
// //   } catch (error) {
// //     console.error("Error in POST /api/apply-promo:", error);
// //     return NextResponse.json(
// //       { error: "Failed to apply promo code" },
// //       { status: 500 }
// //     );
// //   }
// // }
// ///////////////////////////
// export async function POST(req) {
//   try {
//     await dbConnect();
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }
//     const decoded = verifyToken(token);
//     if (!decoded) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }
//     const userId = decoded.id;
//     const { promoCode } = await req.json();

//     // Retrieve all discounts
//     const discounts = await Discount.find({ isused: false, user: userId });

//     // Check if the promo code exists in any of the discounts
//     const matchingDiscount = discounts.find(
//       (discount) => discount.discountCode === promoCode
//     );

//     if (matchingDiscount) {
//       // Promo code found
//       return new Response(
//         JSON.stringify({
//           success: true,
//           message: "Promo code is valid",
//           discount: matchingDiscount,
//         }),
//         {
//           status: 200,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     } else {
//       // Promo code not found
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: "Invalid promo code",
//         }),
//         {
//           status: 404,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }
//   } catch (err) {
//     console.error(err);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Server error",
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
//////////////////

// import { NextResponse } from "next/server";
// import dbConnect from "../../../lib/mongodb";
// import Discount from "../../../models/Discount";
// import { verifyToken } from "../../../utils/jwt";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }
//     const decoded = verifyToken(token);
//     if (!decoded) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }
//     const userId = decoded.id;
//     const { promoCode } = await req.json();

//     // Retrieve all unused discounts for the user
//     const discount = await Discount.findOne({
//       isUsed: false,
//       user: userId,
//       discountCode: promoCode,
//     });

//     if (discount) {
//       // Promo code found and not used
//       return NextResponse.json({
//         success: true,
//         message: "Promo code is valid",
//         discount: {
//           amount: discount.amount,
//           discountCode: discount.discountCode,
//         },
//       });
//     } else {
//       // Promo code not found or already used
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid or already used promo code",
//         },
//         { status: 400 }
//       );
//     }
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Server error",
//       },
//       { status: 500 }
//     );
//   }
// }
//////////////////////////////////////////////
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Discount from "../../../models/Discount";
import { verifyToken } from "../../../utils/jwt";

export async function POST(req) {
  console.log("Discount validation request received");
  try {
    await dbConnect();
    console.log("Database connected");

    const token = req.cookies.get("token")?.value;
    if (!token) {
      console.log("No authentication token found");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      console.log("Invalid token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;
    const { promoCode } = await req.json();
    console.log(`Validating promo code: ${promoCode} for user: ${userId}`);

    if (!promoCode) {
      console.log("No promo code provided");
      return NextResponse.json(
        { success: false, message: "No promo code provided" },
        { status: 400 }
      );
    }

    // Retrieve all unused discounts for the user
    const discount = await Discount.findOne({
      isUsed: false,
      user: userId,
      discountCode: promoCode,
    }).lean(); // Using lean() for better performance

    if (discount) {
      console.log(`Valid promo code found: ${discount._id}`);
      // Promo code found and not used
      return NextResponse.json({
        success: true,
        message: "Promo code is valid",
        discount: {
          id: discount._id,
          amount: discount.amount,
          discountCode: discount.discountCode,
        },
      });
    } else {
      console.log("Invalid or already used promo code");
      // Promo code not found or already used
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or already used promo code",
        },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
