import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import Challenges from "../../../../../models/Challenges";

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  console.log("edit", id);

  try {
    await dbConnect(); // Connect to the database

    const updatedChallenge = await Challenges.findByIdAndUpdate(
      id,
      { ...body }, // Update the document with the request body
      { new: true, runValidators: true }
    );

    if (!updatedChallenge) {
      return new Response(JSON.stringify({ message: "Challenge not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedChallenge), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// Change the function name to PATCH to match the frontend request method.
export async function PATCH(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    const deletedChallenge = await Challenges.findByIdAndUpdate(
      id,
      { isDeleted: true }, // Soft delete
      { new: true }
    );

    if (!deletedChallenge) {
      return new Response(JSON.stringify({ message: "Challenge not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Challenge deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
