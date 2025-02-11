import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { authMiddleware } from "../middleware/auth";

interface UserJwtPayload extends JwtPayload {
    id: number
}
interface AuthenticatedRequest extends NextRequest {
    user: UserJwtPayload
}

export async function POST(request: AuthenticatedRequest) {
    try {
        const prisma = new PrismaClient();
        const response = authMiddleware(request);

        if (response.status != 200) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { followeeId, followerId } = await request.json();

        const newFollower = await prisma.follower.create({
            data: {
                followerId,
                followeeId
            }
        })

        return NextResponse.json(newFollower);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}