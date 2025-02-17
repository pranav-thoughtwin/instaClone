import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { authMiddleware } from "../middleware/auth";

interface UserJwtPayload extends JwtPayload {
    id: number
}
interface AuthenticatedRequest extends NextRequest {
    user: UserJwtPayload
}

export async function OPTIONS(request: NextRequest) {
    console.log(request);
    return NextResponse.json({}, { status: 204 });
}

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

export async function POST(request: AuthenticatedRequest) { 
    try {
      console.log(request);
    //   const response = authMiddleware(request);
    //   if (response.status != 200) {
    //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    //   }

      const response = NextResponse.json({ message: "Test feed post" }, { status: 201 });
  
      return response;
  
    } catch (error: unknown) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }