import connectDB from '@/helpers/database';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/nodemailer';

// Connect to your database
connectDB();

// GET /api/users/sign-up
export async function GET(req: NextRequest, res: NextResponse) {}

// POST /api/users/sign-up
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { username, email, password } = await req.json();

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                {
                    message: 'User already exists',
                },
                { status: 400 }
            );
        }

        // Hash password with bcryptjs
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        // Send verification email
        await sendEmail({
            email: newUser.email,
            emailType: 'VERIFY_EMAIL',
            userID: newUser._id,
        });

        // Return response
        return NextResponse.json(
            {
                user: newUser,
                message: 'User created successfully',
                success: true,
            },
            { status: 201 }
        );

        // Catch and return any errors
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// PUT /api/users/sign-up
export async function PUT(req: NextRequest, res: NextResponse) {}

// DELETE /api/users/sign-up
export async function DELETE(req: NextRequest, res: NextResponse) {}

// PATCH /api/users/sign-up
export async function PATCH(req: NextRequest, res: NextResponse) {}
