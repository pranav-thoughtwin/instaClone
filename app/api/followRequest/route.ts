import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authMiddleware } from "../middleware/auth";
import { AuthenticatedRequest } from "@/types";

export async function POST(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const prisma = new PrismaClient();
        const user = request.user;
        const { receiverId } = await request.json();

        if (user.id === receiverId) {
            return NextResponse.json({ error: "Sender and receiver must be different" }, { status: 400 });
        }

        const newRequest = await prisma.followRequest.create({
            data: {
                senderId: user.id,
                receiverId
            }
        })
        return NextResponse.json(newRequest);

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}