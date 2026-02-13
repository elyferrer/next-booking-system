import Status from "@/lib/models/status";
import connectMongoDB from "@/lib/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH (request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();

        const { id } = await params;
        const formData = await request.json();
        const data = await Status.findByIdAndUpdate(
            id,
            { $set: formData },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ message: 'Successfully updated record', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update recor' }, { status: 500 });
    }
}

export async function DELETE ({}, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();

        const { id } = await params;
        await Status.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Successfully deleted record' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete record' }, { status: 500 });
    }
}