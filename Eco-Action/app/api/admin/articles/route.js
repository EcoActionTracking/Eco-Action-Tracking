import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Article from "../../../../models/Article";

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body to get article data
    const body = await req.json();

    const { title, description, category, photos, videos } = body; // Directly destructuring photos and videos

    // Validate the required fields
    if (!title || !description || !category) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new article with media (photos and videos)
    const newArticle = new Article({
      title,
      description,
      category,
      media: {
        photos: photos || [],  // Save photos array
        videos: videos || [],  // Save videos array
      },
    });

    // Save the article to the database
    await newArticle.save();

    // Return a success response
    return NextResponse.json(
      { message: "Article created successfully" },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      { message: "Error creating article", error: error.message },
      { status: 500 }
    );
  }
}
