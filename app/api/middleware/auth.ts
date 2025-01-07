// import { NextRequest, NextResponse } from 'next/server';
// import { verifyToken } from '../../../utils/jwt';

// export function authMiddleware(request: NextRequest) {
//   const token = request.headers.get('Authorization')?.split(' ')[1];

//   if (!token) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const user = verifyToken(token);

//   if (!user) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   request.user = user;

//   return NextResponse.next();
// }