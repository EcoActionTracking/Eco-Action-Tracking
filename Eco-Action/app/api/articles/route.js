import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Article } from "@/models";

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  const skip = (page - 1) * limit;

  try {
    // Find articles where isDeleted is false
    const articles = await Article.find({ isDeleted: false }).skip(skip).limit(limit);
    const total = await Article.countDocuments({ isDeleted: false });
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      articles,
      currentPage: page,
      totalPages: totalPages,
      totalArticles: total,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
