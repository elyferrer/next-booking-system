import User from "@/lib/models/user";
import connectMongoDB from "@/lib/mongodbConnection";
import jwt from 'jsonwebtoken';
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { generateAuthToken, generateRefreshToken } from "@/utils/jwt";

export async function POST (request: NextRequest) {
    try {
        await connectMongoDB();
        const { 
            username, 
            password
        } = await request.json();

        const data = await User.findOne({
            '$or': [
                { email: username },
                { username: username }
            ]
        });
        
        const isPasswordMatched = await compare(password, data.password);

        if (!isPasswordMatched) {
            return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
        }

        if (!data) {
            return NextResponse.json({ message: 'User not found', data }, { status: 404 });
        }

        await generateRefreshToken({ tokenType: 'ref', type: data.userType, ref: data._id, name: data.username });
        await generateAuthToken({ tokenType: 'auth', type: data.userType, ref: data._id, name: data.username });

        return NextResponse.json({ message: 'User logged in' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 })
    }
}