import { NextResponse } from "next/server";

export async function POST() {
    try {

    } catch (error: unknown) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}