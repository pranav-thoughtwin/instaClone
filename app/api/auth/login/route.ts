import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { signToken } from '../../../../utils/jwt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const token = signToken({ id: user.id, email: user.email });

    return NextResponse.json({ user, token });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }
}