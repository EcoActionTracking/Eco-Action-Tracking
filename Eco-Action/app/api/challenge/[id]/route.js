import dbConnect from "../../../../lib/mongodb";
import Challenge from "../../../../models/Challenges";

// GET: Fetch a challenge by ID
export async function GET(request, { params }) {
  const { id } = params; // الحصول على الـ ID من الـ URL
  await dbConnect();

  try {
    // البحث عن التحدي باستخدام الـ ID والتأكد أنه ليس محذوفاً
    const challenge = await Challenge.findOne({ _id: id, isDeleted: false });

    if (!challenge) {
      // إذا لم يتم العثور على التحدي، نرجع رسالة خطأ 404
      return new Response(JSON.stringify({ message: "Challenge not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // نرجع التحدي الموجود في شكل JSON
    return new Response(JSON.stringify(challenge), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching challenge:", error);

    // نرجع رسالة خطأ في حالة حدوث مشكلة
    return new Response(
      JSON.stringify({ message: "Error fetching challenge" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
