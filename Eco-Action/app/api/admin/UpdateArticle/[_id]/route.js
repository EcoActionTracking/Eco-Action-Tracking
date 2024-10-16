// pages/api/articles/[id].js
import dbConnect from '../../../../../lib/mongodb'; // Adjust the path if necessary
import Article from '../../../../../models/Article'; // Adjust the path according to your project structure
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await dbConnect();
  
  const { _id } = params;

  try {

      const updateData = await req.json();


      const result = await Article.findByIdAndUpdate(
          _id,
          { $set: updateData }, 
          { new: true, runValidators: true } 
      );

      if (!result) {
          return NextResponse.json({ message: 'Article not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Article updated successfully', result }, { status: 200 });
  } catch (error) {
      console.error("Error updating article:", error);
      return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
