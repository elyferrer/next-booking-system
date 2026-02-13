import Booking from "@/lib/models/booking";
import connectMongoDB from "@/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const bookings = await Booking.find().populate('status')
        .populate({
            path: 'userId',
            populate: { path: 'userType' }
        }).populate({
            path: 'outboundSchedule',
            populate: [
                { path: 'bus', populate: ['busClass', 'busCompany'] },
                { path: 'busRoute', populate: ['source', 'destination'] }
            ]
        });

        return NextResponse.json({ bookings });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to retrieve bookings' }, { status: 500 })
    }
}

export async function POST (request: NextRequest) {
    try {
        await connectMongoDB();
        const { 
            userId,
            outboundSchedule, 
            returnSchedule, 
            passengers, 
            passengerCount, 
            totalPrice,
            status,
            remarks
        } = await request.json();

        const newBooking = new Booking({
            userId,
            outboundSchedule, 
            returnSchedule, 
            passengers, 
            passengerCount, 
            totalPrice,
            status,
            remarks
        });

        await newBooking.save();

        return NextResponse.json({ 
            message: 'Booking successfully created', 
            data: newBooking 
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}