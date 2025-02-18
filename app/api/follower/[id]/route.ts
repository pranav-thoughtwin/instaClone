import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authMiddleware } from "../../middleware/auth";
import { AuthenticatedRequest } from "@/types";

export async function GET(request: AuthenticatedRequest) {
    try {
        const prisma = new PrismaClient();
        const response = authMiddleware(request);

        if (response.status != 200) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(request.url);
        const userId = url.pathname.split("/").pop();
        let userIdInt;
        if (userId) {
            userIdInt = parseInt(userId);
        }

        const followers = await prisma.follower.findMany({
            where: {
                followeeId: userIdInt
            },
            include: {
                follower: {
                    select: {
                        username: true,
                        profilePicture: true,
                        fullName: true
                    }
                }
            }
        });

        const following = await prisma.follower.findMany({
            where: {
                followerId: userIdInt
            },
            include: {
                followee: {
                    select: {
                        username: true,
                        profilePicture: true,
                        fullName: true
                    }
                }
            }
        });

        return NextResponse.json({ followers, following });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}