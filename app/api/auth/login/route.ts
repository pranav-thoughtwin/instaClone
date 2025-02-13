import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { corsMiddleware } from '../../middleware/corsMiddleware';

export async function POST(request: NextRequest) {
    const response = NextResponse.next();
    await corsMiddleware(request, response);

    try {
        const prisma = new PrismaClient();
        const { email, password } = await request.json();

        const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || 'secret';

        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign({ id: user.id, email: user.email, name: user.fullName }, SECRET_KEY, { expiresIn: '1h' });

        const response = NextResponse.json({ message: "Login successful", token }, { status: 200 });
        return response;
    } catch (error: unknown) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}