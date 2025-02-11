import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../middleware/auth";


interface UserJwtPayload extends JwtPayload {
    id: number
}
interface AuthenticatedRequest extends NextRequest {
    user: UserJwtPayload
}

export async function POST(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const prisma = new PrismaClient();
        const user = request.user;
        const { receiverId } = await request.json();

        console.log("Sender: ", user.id);
        console.log("Reciever Id: ", receiverId);


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