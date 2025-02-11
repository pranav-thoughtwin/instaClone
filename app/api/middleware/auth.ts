import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthenticatedRequest extends NextRequest {
    user?: JwtPayload | string
}

export function authMiddleware(request: AuthenticatedRequest) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || 'secret';

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = jwt.verify(token, SECRET_KEY);
    // console.log("User from token: ", user);

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    request.user = user;
    // console.log("Request: ", request.user);

    return NextResponse.next();
}