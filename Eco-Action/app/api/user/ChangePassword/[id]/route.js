import dbConnect from '../../../../../lib/mongodb'; // MongoDB connection utility
import User from '../../../../../models/User'; // Your User model
import bcrypt from 'bcryptjs'; // Ensure you're using the correct bcrypt package

export async function PUT(req, { params }) {
  await dbConnect();
  
  const { id } = params; 

  const { oldPassword, newPassword } = await req.json(); // Get old and new passwords

  try {
    // Find the user by ID
    const user = await User.findById(id).select('+password'); // Include password field

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if the old password matches
    const isMatch = await user.matchPassword(oldPassword); // Use your matchPassword method

    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Old password is incorrect' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash new password with 10 salt rounds
    user.password = hashedPassword; // Update user's password

    await user.save(); // Save the updated user

    return new Response(JSON.stringify({ message: 'Password changed successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
