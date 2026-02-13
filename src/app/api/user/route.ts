import User from "@/lib/models/user";
import connectMongoDB from "@/lib/mongodbConnection";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const data = await User.aggregate([
            {
                "$lookup": {
                    "from": "usertypes", "localField": "userType", "foreignField": "_id", "as": "userType"
                }
            }, { "$unwind": "$userType" }
        ]);

        return NextResponse.json({ message: 'Successfully retrieved data', data }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed to retrieve data' }, { status: 500 })
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