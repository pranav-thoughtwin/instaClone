import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    try {
        const tokenCookie = request.cookies.get('token');
        const token = tokenCookie?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/accounts/login', request.url));
        }

        const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || 'secret';

        try {
            jwt.verify(token, SECRET_KEY);
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // Token is expired, clear the cookie and redirect to login
                response.cookies.delete('token');
                return NextResponse.redirect(new URL('/accounts/login', request.url));
            }
            // return NextResponse.json({ error: 'Unauthordfized' }, { status: 401 });
            return NextResponse.redirect(new URL('/accounts/login', request.url));
        }

        return response;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message });
        }
        return NextResponse.json({ error: 'An unknown error occurred' });
    }
}

export const config = {
    matcher: ['/api/:path*', '/', '/profile'],
};