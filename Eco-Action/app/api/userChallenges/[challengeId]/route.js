import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../../lib/mongodb';
import UserChallenges from '../../../../models/UserChallenges';

function getUserIdFromToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id; // Ensure the decoded token contains the expected data
    } catch (error) {
        throw new Error("Invalid token: " + error.message);
    }
}

export async function POST(req, { params }) {
    try {
        await dbConnect();

        const { challengeId } = params;

        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ message: 'No token provided' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        console.log("Received Token:", token); // Debugging line

        const userId = getUserIdFromToken(token);
        console.log("User ID: " + userId);

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


