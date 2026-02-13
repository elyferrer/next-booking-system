import Bus from "@/lib/models/bus";
import connectMongoDB from "@/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const data = await Bus.find().populate(['busClass', 'busCompany']);

        return NextResponse.json({ message: 'Successfully retrieved data', data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to retrieve data' }, { status: 500 })
    }
}

export async function POST (request: NextRequest) {
    try {
        await connectMongoDB();
        const { busClass, busCompany, busNumber, plateNumber, capacity, active } = await request.json();
        const data = new Bus({ busClass, busCompany, busNumber, plateNumber, capacity, active });
        await data.save();

        return NextResponse.json({ message: 'Bus successfully created', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add bus' }, { status: 500 })
    }
}