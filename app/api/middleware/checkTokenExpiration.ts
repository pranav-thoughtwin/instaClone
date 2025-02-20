import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { toast } from 'react-toastify';

interface AuthenticatedRequest extends NextRequest {
    user?: JwtPayload | string
}

export function checkTokenExpiration(request: AuthenticatedRequest) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || 'secret';
    if (!token) {
        return NextResponse.redirect(new URL('/accounts/login', request.url));
    }

    try {
        const res = jwt.verify(token, SECRET_KEY);
        console.log("res: ", res);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            // Token is expired, clear the cookie and redirect to login
            const response = NextResponse.redirect(new URL('/accounts/login', request.url));
            toast("Token expired, redirecting to login page...");
            console.log("Redirecting and removing expored token...");
            response.cookies.delete('token');
            return response;
        }
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
}