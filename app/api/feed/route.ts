import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authMiddleware } from "../middleware/auth";
import { AuthenticatedRequest } from "@/types";


export async function GET(request: AuthenticatedRequest) {
    try {
        const prisma = new PrismaClient();
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const following = await prisma.follower.findMany({
            where: {
                followerId: request.user.id
            },
            select: {
                followeeId: true
            }
        })
        const followingIds = [...new Set(following.map(item => item.followeeId))];
        const posts = await Promise.all(followingIds.map(async (userId) => {
            return await prisma.post.findMany({
                where: {
                    userId
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
        }));

        return NextResponse.json({ posts });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });

    }
}
