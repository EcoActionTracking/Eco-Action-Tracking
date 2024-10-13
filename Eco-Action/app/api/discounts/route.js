import dbConnect from "../../../lib/mongodb";
import Challenges from '@/models/Challenges'; // Adjust path as necessary
import Discount from '@/models/Discount'; // Adjust path as necessary

export async function POST(req) {
  const { userId, challengeId } = await req.json();

  // Validate input
  if (!userId || !challengeId) {
    return new Response(JSON.stringify({ message: 'User ID and Challenge ID are required' }), {
      status: 400,
    });
  }

  try {
    // Connect to the database
    await dbConnect();

    // Find the challenge by ID
    const challenge = await Challenges.findById(challengeId);

    // Check if the challenge exists
    if (!challenge) {
      return new Response(JSON.stringify({ message: 'Challenge not found' }), {
        status: 404,
      });
    }

    // Create the discount document
    const discount = new Discount({
      amount: challenge.discount.amount,
      discountCode: challenge.discount.discountCode,
      user: userId,
    });

    // Save the discount to the database
    await discount.save();

    return new Response(JSON.stringify({ message: 'Discount created successfully', discount }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating discount:', error);
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), {
      status: 500,
    });
  }
}
