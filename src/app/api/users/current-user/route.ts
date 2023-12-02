import connectDB from '@/helpers/database';
import getDataFromToken from '@/helpers/getDataFromToken';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connectDB();

// GET /api/users/current-user
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const userID = await getDataFromToken(req).id!;

        // Get the user from the database
        const user = await User.findById({ _id: userID }).select('-password');

        // If the user doesn't exist
        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found',
                },
                { status: 404 }
            );
        }

        // Return the user
        return NextResponse.json(
            {
                user,
                message: 'User found successfully',
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Couldn't get the user",
            },
            { status: 500 }
        );
    }
}
