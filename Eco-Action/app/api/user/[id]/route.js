import dbConnect from '../../../../lib/mongodb'; 
import User from '../../../../models/User'; 


export async function PUT(req, { params }) {
  await dbConnect();

  const { id } = params; 
  
  try {
  
    const user = await User.findById(id);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const { username, email, image, isActive } = await req.json();

    if (username) user.username = username;
    if (email) user.email = email;
    if (image) user.image = image;
    if (typeof isActive === 'boolean') user.isActive = isActive;

    await user.save();

    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error); 
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
  }
}
