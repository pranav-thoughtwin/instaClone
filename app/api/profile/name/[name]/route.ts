import { authMiddleware } from "@/app/api/middleware/auth";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface UserJwtPayload extends JwtPayload {
    id: number
}
interface AuthenticatedRequest extends NextRequest {
    user: UserJwtPayload
}

export async function GET(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "No token found" });
        }

        // const username = await request.json();
        const url = new URL(request.url);
        const username = url.pathname.split("/").pop();
        const prisma = new PrismaClient();
        const accounts = await prisma.user.findMany({
            where: {
                username: {
                    contains: username,
                    mode: 'insensitive'
                }
            }
        })
        console.log("Accounts: ", accounts);
        return NextResponse.json(accounts);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}