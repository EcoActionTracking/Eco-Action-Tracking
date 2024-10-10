import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Article } from "@/models";
export async function GET(_, { params }) {
  await dbConnect();

  const { id } = params;

  const article = await Article.findById(id);
  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  return NextResponse.json({ article });
}
