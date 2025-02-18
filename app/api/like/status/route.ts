import { NextResponse } from "next/server"
import { authMiddleware } from "../../middleware/auth";
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
        const userId = request.user
        const status = await prisma.like.findMany({
            where: {
                postId,
                userId: userId?.id
            }
        })
        return NextResponse.json(status);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 });
    }
}