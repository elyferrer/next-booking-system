import Booking from "@/lib/models/booking";
import connectMongoDB from "@/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        const bookings = await Booking.aggregate([
            {
                "$lookup": {
                    "from": 'users', "localField": 'userId', "foreignField": '_id', "as": 'user'
                }
            }, { "$unwind": "$user" },
            {
                "$lookup": {
                    "from": "usertypes", "localField": "user.userType", "foreignField": "_id", "as": "user.userType"
                }
            }, { "$unwind": "$user.userType" },
            
            {
                "$lookup": {
                    "from": 'status', "localField": 'status', "foreignField": '_id', "as": 'status'
                }
            }, { "$unwind": "$status" },
            
            {
                "$lookup": {
                    "from": 'schedules', "localField": 'outboundSchedule', "foreignField": '_id', "as": 'outboundSchedule'
                }
            }, { "$unwind": "$outboundSchedule" },
            {
                "$lookup": {
                    "from": 'buses', "localField": 'outboundSchedule.bus', "foreignField": '_id', "as": 'outboundSchedule.bus'
                }
            }, { "$unwind": "$outboundSchedule.bus" },
            {
                "$lookup": {
                    "from": 'busclasses', "localField": 'outboundSchedule.bus.busClass', "foreignField": '_id', "as": 'outboundSchedule.bus.busClass'
                }
            }, { "$unwind": "$outboundSchedule.bus.busClass" },
            {
                "$lookup": {
                    "from": 'buscompanies', "localField": 'outboundSchedule.bus.busCompany', "foreignField": '_id', "as": 'outboundSchedule.bus.busCompany'
                }
            }, { "$unwind": "$outboundSchedule.bus.busCompany" },
            
            {
                "$lookup": {
                    "from": 'busroutes', "localField": 'outboundSchedule.busRoute', "foreignField": '_id', "as": 'outboundSchedule.busRoute'
                }
            }, { "$unwind": "$outboundSchedule.busRoute" },
            {
                "$lookup": {
                    "from": 'places', "localField": 'outboundSchedule.busRoute.source', "foreignField": '_id', "as": 'outboundSchedule.busRoute.source'
                }
            }, { "$unwind": "$outboundSchedule.busRoute.source" },
            {
                "$lookup": {
                    "from": 'places', "localField": 'outboundSchedule.busRoute.destination', "foreignField": '_id', "as": 'outboundSchedule.busRoute.destination'
                }
            }, { "$unwind": "$outboundSchedule.busRoute.destination" },
        ]);

        return NextResponse.json({ bookings });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 })
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