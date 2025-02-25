import { AuthenticatedRequest } from "@/types";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "@/app/api/middleware/auth";

export async function GET(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const prisma = new PrismaClient();
        const url = new URL(request.url);
        const postId = url.pathname.split("/").pop();

        if (!postId) {
            return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
        }

        const likeCount = await prisma.like.count({
            where: {
                postId: Number(postId),
            },
        });

        return NextResponse.json(likeCount);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 });
    }
}