import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../middleware/auth";
import { PrismaClient } from "@prisma/client";

interface UserJwtPayload extends JwtPayload {
    userId: number
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

        const url = new URL(request.url);
        const userId = (url.pathname.split("/").pop());
        let userIdInt
        if (userId) {
            userIdInt = parseInt(userId);
        }

        const prisma = new PrismaClient();
        const posts = await prisma.post.findMany({
            where: {
                userId: userIdInt
            }
        })
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}

export async function DELETE(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "No token found" });
        }

        const { postId } = await request.json();

        const prisma = new PrismaClient();
        const deletedPost = await prisma.post.delete({
            where: {
                id: postId
            }
        })
        return NextResponse.json(deletedPost);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}

export async function PUT(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "No token found" });
        }

        const { caption } = await request.json();
        const url = new URL(request.url);
        const postId = url.pathname.split("/").pop();

        let postIdInt
        if (postId) {
            postIdInt = parseInt(postId);
        }

        const prisma = new PrismaClient();
        const updatedPost = await prisma.post.update({
            where: {
                id: postIdInt
            },
            data: {
                caption
            }
        })

        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}