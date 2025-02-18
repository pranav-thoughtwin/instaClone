import { NextResponse } from "next/server";
import { authMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "@/types";

export async function POST(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const prisma = new PrismaClient();
        const user = request.user;
        const { postId, content } = await request.json();

        const newComment = await prisma.comment.create({
            data: {
                postId,
                content,
                userId: user.id
            }
        });
        return NextResponse.json(newComment);

    } catch (error: unknown) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}
