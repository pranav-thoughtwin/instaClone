import { authMiddleware } from "@/app/api/middleware/auth";
import { AuthenticatedRequest } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: AuthenticatedRequest) {
    try {
        const response = authMiddleware(request);
        if (response.status != 200) {
            return NextResponse.json({ error: "No token found" });
        }

        const url = new URL(request.url);
        const username = url.pathname.split("/").pop();
        const prisma = new PrismaClient();
        const accounts = await prisma.user.findMany({
            where: {
                username: {
                    contains: username,
                    mode: 'insensitive'
                }
            }
        })
        return NextResponse.json(accounts);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}