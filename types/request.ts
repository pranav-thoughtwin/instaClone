import { JwtPayload } from "jsonwebtoken"
import { NextRequest } from "next/server"

export interface UserJwtPayload extends JwtPayload {
    id: number
}

export interface AuthenticatedRequest extends NextRequest {
    user: UserJwtPayload
}