import BusCompany from "@/lib/models/busCompany";
import connectMongoDB from "@/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const data = await BusCompany.find();

        return NextResponse.json({ message: 'Successfully retrieved data', data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to retrieve data' }, { status: 500 })
    }
}

export async function POST (request: NextRequest) {
    try {
        await connectMongoDB();
        const { name, description, active, remarks } = await request.json();
        const data = new BusCompany({ name, description, active, remarks });
        await data.save();

        return NextResponse.json({ message: 'Record successfully created', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add new record' }, { status: 500 })
    }
}