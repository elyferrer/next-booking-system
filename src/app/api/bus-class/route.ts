import BusClass from "@/lib/models/busClass";
import connectMongoDB from "@/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const busClasses = await BusClass.find();

        return NextResponse.json({ busClasses });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to retrieve bus classes' }, { status: 500 })
    }
}

export async function POST (request: NextRequest) {
    try {
        await connectMongoDB();
        const { name, description, active } = await request.json();
        const newBusClass = new BusClass({ name, description, active });
        await newBusClass.save();

        return NextResponse.json({ 
            message: 'Bus class successfully created', 
            data: newBusClass 
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add bus class' }, { status: 500 })
    }
}