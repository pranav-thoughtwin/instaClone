import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../../middleware/auth";

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

        const prisma = new PrismaClient();
        const url = new URL(request.url);
        const userId = url.pathname.split("/").pop();
        let userIdInt;
        if (userId) {
            userIdInt = parseInt(userId);
        }

        const data = await prisma.user.findUnique({
            where: {
                id: userIdInt
            }
        });

        return NextResponse.json({ ...data, password: "", createdAt: "" });
    } catch (error: unknown) {
        console.log("Error: ", error);
        return NextResponse.json({ error: error }, { status: 400 });
    }
}

export async function POST(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "No token found" });
        }
        
        const { bio, profilePicture } = await request.json();
        const url = new URL(request.url);
        const userId = url.pathname.split("/").pop();
        let userIdInt;
        if (userId) {
            userIdInt = parseInt(userId);
        }
        
        const prisma = new PrismaClient();
        const profileData = await prisma.user.update({
            where: {
                id: userIdInt
            },
            data: {
                bio,
                profilePicture
            }
        })
        return NextResponse.json(profileData);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}