import dbConnect from "../../../lib/mongodb";
import Challenge from "../../../models/Challenges";

// GET: Fetch challenges
export async function GET() {
  await dbConnect();

  try {
    // Fetch all challenges that are not marked as deleted
    const challenges = await Challenge.find({ isDeleted: false });

    // Return the challenges in JSON format
    return new Response(JSON.stringify(challenges), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching challenges:", error);

    // Return an error response
    return new Response(
      JSON.stringify({ message: "Error fetching challenges" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// POST: Add a new challenge
export async function POST(req) {
  await dbConnect();

  try {
    // Parse the request body to get the challenge data
    const data = await req.json();

    // Create a new Challenge document in the database
    const newChallenge = await Challenge.create(data);

    // Return the newly created challenge in JSON format
    return new Response(JSON.stringify(newChallenge), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating challenge:", error);

    // Return an error response if something goes wrong
    return new Response(
      JSON.stringify({ message: "Error creating challenge" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
