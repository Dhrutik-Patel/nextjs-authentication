import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublic = path === '/sign-in' || path === '/sign-up';

    const isLoggedIn = !!request.cookies.get('token')?.value;

    if (isPublic && isLoggedIn) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublic && !isLoggedIn) {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }
}

export const config = {
    matcher: ['/', '/sign-in', '/sign-up', '/profile'],
};
