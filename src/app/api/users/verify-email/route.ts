import connectDB from '@/helpers/database';
import { sendEmail } from '@/helpers/nodemailer';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

// Connect to DB
connectDB();

// GET /api/users/verify-email/:token
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { token } = await req.json();
        console.log('Token: ', token);

        // Check if token is valid
        const user = await User.findOne({
            verifyEmailToken: token,
            verifyEmailTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid or expired token.' },
                {
                    status: 400,
                }
            );
        }

        // Update user
        user.isVerified = true;
        user.verifyEmailToken = undefined;
        user.verifyEmailTokenExpires = undefined;
        await user.save();

        return NextResponse.json(
            { message: 'Email verified successfully.' },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            {
                status: 500,
            }
        );
    }
}
