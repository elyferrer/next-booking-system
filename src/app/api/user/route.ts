import User from "@/lib/models/user";
import connectMongoDB from "@/lib/mongodbConnection";
import { verifyToken, parseAuthToken } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        const token = await verifyToken();

        if (token) {
            const payload = await parseAuthToken(token);
            const user = await User.findOne({ _id: payload.ref });

            return NextResponse.json({ message: "Successful retrieved user details", user }, { status: 200 });
        }

        return NextResponse.json({ message: "Session already expired" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to retrieved user details" }, { status: 500 });
    }
    
}

export async function POST (request: NextRequest) {
    try {
        await connectMongoDB();
        const { 
            lastName, 
            firstName, 
            email,
            mobile, 
            username, 
            password,
            emailVerifiedAt,
            userType,
            active
        } = await request.json();

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const data = new User({
            lastName,
            firstName, 
            email,
            mobile, 
            username, 
            password: hashedPassword,
            emailVerifiedAt,
            userType,
            active
        });
        
        await data.save();

        return NextResponse.json({ message: 'Record successfully created', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create new record' }, { status: 500 })
    }
}