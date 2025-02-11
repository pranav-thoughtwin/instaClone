import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get('token');
        if (!token) {
            return NextResponse.redirect(new URL('/accounts/login', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        NextResponse.json({ error: error });
    }
}

export const config = {
    matcher: ['/', '/profile'],
};