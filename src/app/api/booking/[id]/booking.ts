import Booking from "@/lib/models/booking";
import connectMongoDB from "@/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const bookings = await Booking.find();

        return NextResponse.json({ bookings });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to retrieve bookings' }, { status: 500 })
    }
}

export async function POST (request: NextRequest) {
    try {
        await connectMongoDB();
        const { source, destination, rate, active, remarks } = await request.json();
        const newBusRoute = new Booking({ source, destination, rate, active, remarks });
        await newBusRoute.save();

        return NextResponse.json({ 
            message: 'Bus route successfully created', 
            data: newBusRoute 
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add bus route' }, { status: 500 })
    }
}