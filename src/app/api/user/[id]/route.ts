import User from "@/lib/models/user";
import connectMongoDB from "@/lib/mongodbConnection";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH (request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();

        const { id } = await params;
        const formData = await request.json();

        if (formData.password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(formData.password, salt);
            formData.password = hashedPassword;
        }

        const data = await User.findByIdAndUpdate(
            id,
            { $set: formData },
            { new: true, runValidators: true }
        );

        return NextResponse.json({ message: 'Successfully updated record', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update record' }, { status: 500 });
    }
}

export async function DELETE ({}, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();

        const { id } = await params;
        await User.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Successfully deleted record' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete record' }, { status: 500 });
    }
}