import connectDB from '@/helpers/database';
import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
// @ts-ignore
import jwt from 'jsonwebtoken';

// Connect to your database
connectDB();

// GET /api/users/sign-up
export async function GET(req: NextRequest, res: NextResponse) {}

// POST /api/users/sign-up
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, password } = await req.json();

        // Check if user already exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                {
                    message: 'User does not exist',
                },
                { status: 400 }
            );
        }

        // Hash password with bcryptjs
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Check if password is correct
        const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return NextResponse.json(
                {
                    message: 'Invalid credentials',
                },
                { status: 400 }
            );
        }

        // Create jwt token for user
        const token = {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        };

        const jwtToken = await jwt.sign(token, process.env.JWT_SECRET!, {
            expiresIn: '1d',
        });

        // Return response
        const response = NextResponse.json(
            {
                message: 'User signed in successfully',
                success: true,
            },
            { status: 201 }
        );

        response.cookies.set('token', jwtToken, {
            httpOnly: true,
        });

        return response;
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
