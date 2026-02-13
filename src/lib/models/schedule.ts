import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
    busRoute: { type: mongoose.Schema.Types.ObjectId, ref: 'BusRoute' },
    departureDatetime: Date,
    arrivalDatetime: Date,
    price: Number,
    active: Boolean
}, {
    timestamps: true
});

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);

export default Schedule;