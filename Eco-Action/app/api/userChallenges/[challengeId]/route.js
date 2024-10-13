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

// app/api/userChallenges/[challengeId]/route.js


export async function PUT(request, { params }) {
    const { challengeId } = params;
    const { progress } = await request.json();

    // Validate progress value
    if (progress < 0 || progress > 100) {
        return new Response(JSON.stringify({ message: "Progress must be between 0 and 100" }), {
            status: 400,
        });
    }

    try {
        await dbConnect();   

        // Find the UserChallenge by ID
        const userChallenge = await UserChallenges.findById(challengeId);
        if (!userChallenge) {
            return new Response(JSON.stringify({ message: "UserChallenge not found" }), {
                status: 404,
            });
        }

        // Update the progress
        userChallenge.progress = progress;

        // Update the completion status if progress is 100
        if (progress >= 100) {
            userChallenge.completed = true;
        }

        // Save the updated document
        await userChallenge.save();

        return new Response(JSON.stringify(userChallenge), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating UserChallenge:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
        });
    }
}
