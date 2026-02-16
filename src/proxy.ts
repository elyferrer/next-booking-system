import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./utils/jwt";

export async function proxy (request: NextRequest) {
    const validateToken = await verifyToken();
    
    if (!validateToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'],
}