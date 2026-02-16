import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function POST () {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('authToken');
        cookieStore.delete('refToken');
        return NextResponse.json({ message: "Successfully logged out" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error in logging out", error }, { status: 500 });
    }
}