import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { cookies } from 'next/headers';

export type JwtPayload = {
    tokenType: string;
    type: string;
    ref: string;
    name: string;
    iat?: number;
    exp?: number;
}

export type Data = {
    tokenType: string;
    type: string;
    ref: string;
    name: string;
}

export function parseAuthCookie(cookieHeader: string|undefined|null): string | null {
    if (!cookieHeader) return null;

    const cookies = parse(cookieHeader);
    
    return cookies.authToken || null;
}

export async function verifyToken() {
    try {
        const cookieStore = await cookies();
        const authToken: string|undefined = cookieStore.get('authToken')?.value;
        const refToken: string|undefined = cookieStore.get('refToken')?.value;
        
        if (!authToken && refToken) {
            const verifyRef = jwt.verify(refToken, process.env.REF_TOKEN_SECRET!) as JwtPayload;
            const token = generateAuthToken({
                ref: verifyRef.ref,
                name: verifyRef.name,
                type: verifyRef.type,
                tokenType: verifyRef.tokenType,
            });

            return token;
        }

        if (authToken) {
            return authToken;
        }

        return null;
    } catch (error) {
        console.log('JWT Verification failed: ', error)
        return null;
    }
}

export async function parseAuthToken (token: string) {
    return jwt.verify(token, process.env.AUTH_TOKEN_SECRET!) as JwtPayload;
}

export async function generateAuthToken(data: Data) {
    try {
        const token = jwt.sign(data, process.env.AUTH_TOKEN_SECRET!, { expiresIn: 3600 });
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'authToken',
            value: token,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 3600
        });

        return token;
    } catch (error) {
        console.log('error', error)
    }
}

export async function generateRefreshToken(data: Data) {
    try {
        const token = jwt.sign(data, process.env.REF_TOKEN_SECRET!, { expiresIn: 3600 });
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'refToken',
            value: token,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 86400
        });
    } catch (error) {
        console.log('error', error)
    }
}