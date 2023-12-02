import { NextRequest, NextResponse } from 'next/server';

// GET /api/users/sign-out
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const response = NextResponse.json(
            {
                message: 'Sign out successful',
                success: true,
            },
            { status: 200 }
        );

        // Remove cookie
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
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

// POST /api/users/sign-out
export async function POST(req: NextRequest, res: NextResponse) {}

// PUT /api/users/sign-out
export async function PUT(req: NextRequest, res: NextResponse) {}

// DELETE /api/users/sign-out
export async function DELETE(req: NextRequest, res: NextResponse) {}

// PATCH /api/users/sign-out
export async function PATCH(req: NextRequest, res: NextResponse) {}
