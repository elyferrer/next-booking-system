import User from "@/lib/models/user";
import connectMongoDB from "@/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const data = await User.find().populate(['bus', 'busRoute']);

        return NextResponse.json({ message: 'Successfully retrieved data', data }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed to retrieve data' }, { status: 500 })
    }
}

export async function POST (request: NextRequest) {
    try {
        await connectMongoDB();
        const { bus, busRoute, departureDatetime, arrivalDatetime, price } = await request.json();
        const data = new User({ bus, busRoute, departureDatetime, arrivalDatetime, price });
        await data.save();

        return NextResponse.json({ message: 'Record successfully created', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create new record' }, { status: 500 })
    }
}