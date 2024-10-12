import dbConnect from "../../../../lib/mongodb"; 
import UserChallenges from "../../../../models/UserChallenges";
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    await dbConnect();
    
    const { _id } = params;

    try {
        // Soft delete by setting isDeleted to true
        const result = await UserChallenges.findByIdAndUpdate(
            _id,
            { isDeleted: true },
            { new: true }
        );

        if (!result) {
            return NextResponse.json({ message: 'Challenge not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Challenge soft deleted', result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error }, { status: 500 });
    }
}
