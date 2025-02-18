import { NextResponse } from "next/server";
import { authMiddleware } from "../../middleware/auth";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "@/types";

export async function GET(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const prisma = new PrismaClient();
        const url = new URL(request.url);
        const postId = url.pathname.split("/").pop();
        let postIdInt;
        if (postId) {
            postIdInt = parseInt(postId);
        }

        const comments = await prisma.comment.findMany({
            where: {
                postId: postIdInt
            },
            include: {
                user: {
                    select: {
                        username: true,
                        profilePicture: true
                    }
                }
            }
        })
        console.log("Res comment: ", comments);
        return NextResponse.json(comments);

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}