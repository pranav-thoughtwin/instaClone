import { NextResponse } from "next/server";

export default function POST() {
    try {

    } catch (error: unknown) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}