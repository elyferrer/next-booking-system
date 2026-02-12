import BusClass from "@/lib/models/busClass";
import connectMongoDB from "@/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH (request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();

        const { id } = await params;
        const data = await request.json();
        const updatedBusClass = await BusClass.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ 
            message: 'Successfully updated bus class',
            data: updatedBusClass
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update bus class' }, { status: 500 });
    }
}

export async function DELETE (request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();

        const { id } = await params;
        await BusClass.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Successfully deleted bus class' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete bus class' }, { status: 500 });
    }
}