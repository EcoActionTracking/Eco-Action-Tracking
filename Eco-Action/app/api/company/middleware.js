// app/api/company/middleware.js

import { NextResponse } from "next/server";
import { verifyToken } from "../../../utils/jwt"; // Adjust the path as necessary

export async function middleware(request) {
    console.log('Middleware is running...'); // Debug message

    // Extract the token from the Authorization header
    const token = request.headers.get("Authorization")?.split(" ")[1];

    // If the token is missing, return an error
    if (!token) {
        console.log('Authorization token not found'); // Debug message
        return NextResponse.json({ message: 'Authorization token not found' }, { status: 401 });
    }

    // If the token is present, verify it
    try {
        const decoded = verifyToken(token);
        console.log('Decoded token:', decoded); // Debug message
        if (decoded) {
            // Attach the user ID to the request object
            request.userId = decoded.id; // Assuming your token contains the user ID in the 'id' field
        }
    } catch (error) {
        console.error('Token verification error:', error); // Debug message
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Continue processing the request
    return NextResponse.next();
}

// Configuration for the middleware matcher
export const config = {
    matcher: "/api/company", // Apply this middleware only to the company route
};
