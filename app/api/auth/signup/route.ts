import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function POST(request: Request) {
  try {
    const { username, email, password, fullName } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const prisma = new PrismaClient();

    const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || 'secret';

    const existingEmail = await prisma.user.findFirst({
      where: {
        email
      }
    });

    const existingUsername = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (existingEmail) {
      return NextResponse.json({ error: "Email already exist" }, { status: 409 });
    }

    if (existingUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullName
      },
    });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.fullName }, SECRET_KEY, { expiresIn: '1h' });

    const response = NextResponse.json({ message: "Signup successful", token }, { status: 201 });

    return response;

  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}