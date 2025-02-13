// import { NextRequest, NextResponse } from 'next/server';

// export async function middleware(request: NextRequest) {
//     const response = NextResponse.next();

//     try {
//         const token = request.cookies.get('token'); 
//         if (!token) {
//             return NextResponse.redirect(new URL('/accounts/login', request.url));
//         }

//         return response;
//     } catch (error) {
//         if (error instanceof Error) {
//             return NextResponse.json({ error: error.message });
//         }
//         return NextResponse.json({ error: 'An unknown error occurred' });
//     }
// }

// export const config = {
//     matcher: ['/', '/profile'],
// };