import mongoose, { Schema } from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
    departureDatetime: Date,
    arrivalDatetime: Date,
    price: Number
}, {
    timestamps: true
});

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);

export default Schedule;