import { NextResponse } from "next/server";

export default function POST(){
    try {
        
    } catch (error) {
        return NextResponse.json({ error: "Error creating post" }, { status: 400 })
    }
}