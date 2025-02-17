import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log(request);
    const response = NextResponse.json({ message: "Test get" }, { status: 201 });

    return response;

  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log(request);
    const response = NextResponse.json({ message: "Test post" }, { status: 201 });

    return response;

  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}