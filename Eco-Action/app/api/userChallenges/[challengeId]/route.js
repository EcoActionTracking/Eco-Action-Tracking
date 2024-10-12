import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from "../../../../lib/mongodb";
import UserChallenges from "../../../../models/UserChallenges";  

// Helper function to get user ID from token
function getUserIdFromToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        throw new Error("Invalid token");
    }
    return decoded.id;
}

export async function POST(req, { params }) {
    try {
        await dbConnect();   

        const { challengeId } = params;

        // استخراج Authorization header
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ message: 'No token provided' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];

        // استخدام دالة getUserIdFromToken للتحقق من التوكن والحصول على userId
        const userId = getUserIdFromToken(token);
        console.log("User ID: " + userId);

        // استخدام نموذج UserChallenges لإضافة بيانات التحدي
        await UserChallenges.create({
            userId,
            challengeId,
        });

        return NextResponse.json({ message: 'Challenge added successfully!' }, { status: 201 });
    } catch (error) {
        console.error("Error: " + error.message);
        return NextResponse.json({ message: 'Error adding challenge', error: error.message }, { status: 500 });
    }
}
