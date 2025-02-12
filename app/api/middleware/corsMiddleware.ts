import { NextRequest, NextResponse } from 'next/server';

export async function corsMiddleware(req: NextRequest, res: NextResponse, next: () => void) {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204 });
  }

  next();
}