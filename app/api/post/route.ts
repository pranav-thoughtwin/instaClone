import { NextResponse } from "next/server";
import { authMiddleware } from "../middleware/auth";
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from "@/types";

export async function POST(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "No token found" });
        }

        const prisma = new PrismaClient();
        const { imageUrl, caption } = await request.json();
        const user = request.user;

        const newPost = await prisma.post.create({
            data: {
                userId: user.id,
                imageUrl,
                caption
            }
        });
        return NextResponse.json(newPost);
    } catch (error: unknown) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}