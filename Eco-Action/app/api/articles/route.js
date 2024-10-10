import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Article } from "@/models";

export async function GET() {
  await dbConnect();

  try {
    const articles = await Article.find();
    console.log(articles);
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
