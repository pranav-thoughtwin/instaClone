import { NextResponse } from "next/server";
import { authMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "@/types";

export async function POST(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const prisma = new PrismaClient();
        const { postId } = await request.json();
        const user = request.user;

        const newLike = await prisma.like.create({
            data: {
                userId: user.id,
                postId,
            }
        })
        return NextResponse.json(newLike);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 });
    }
}