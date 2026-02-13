import Schedule from "@/lib/models/schedule";
import connectMongoDB from "@/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDB();
        // const data = await Schedule.find().populate(['bus', 'busRoute']);
        const data = await Schedule.aggregate([
            {
                "$lookup": { 
                    "from": "buses", "localField": "bus", "foreignField": "_id", "as": "bus" 
                }
            }, { "$unwind": "$bus" },
            {
                "$lookup": { 
                    "from": "busclasses", "localField": "bus.busClass", "foreignField": "_id", "as": "bus.busClass" 
                }
            }, { "$unwind": "$bus.busClass" },
            {
                "$lookup": { 
                    "from": "buscompanies", "localField": "bus.busCompany", "foreignField": "_id", "as": "bus.busCompany" 
                }
            }, { "$unwind": "$bus.busCompany" },

            {
                "$lookup": {
                    "from": "busroutes", "localField": "busRoute", "foreignField": "_id", "as": "busRoute"
                }
            }, { "$unwind": "$busRoute" },
            {
                "$lookup": {
                    "from": "places", "localField": "busRoute.source", "foreignField": "_id", "as": "busRoute.source"
                }
            }, { "$unwind": "$busRoute.source" },
            {
                "$lookup": {
                    "from": "places", "localField": "busRoute.destination", "foreignField": "_id", "as": "busRoute.destination"
                }
            }, { "$unwind": "$busRoute.destination" }
        ])

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
        const data = new Schedule({ bus, busRoute, departureDatetime, arrivalDatetime, price });
        await data.save();

        return NextResponse.json({ message: 'Record successfully created', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create new record' }, { status: 500 })
    }
}