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

        const url = new URL(request.url);
        const receiverId = url.pathname.split("/").pop();
        let receiverIdInt;
        if (receiverId) {
            receiverIdInt = parseInt(receiverId);
        }

        const prisma = new PrismaClient();
        const requests = await prisma.followRequest.findMany({
            where: {
                receiverId: receiverIdInt
            }
        })

        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}

export async function PUT(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();
        let idInt;
        if (id) {
            idInt = parseInt(id);
        }

        const { status, senderId, receiverId } = await request.json();

        const prisma = new PrismaClient();
        await prisma.followRequest.updateMany({
            where: {
                id: idInt
            },
            data: {
                status
            }
        })

        if (status === 'accepted') {
            await prisma.follower.create({
                data: {
                    followerId: senderId,
                    followeeId: receiverId
                }
            })
        }

        return NextResponse.json({ message: "Status updated" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}