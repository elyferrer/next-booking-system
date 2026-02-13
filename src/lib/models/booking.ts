import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    email: String,
    mobile: String,
    outboundSchedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
    returnSchedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
    passengers: [{ 
        lastName: String, 
        firstName: String, 
        discounted: Boolean, 
        seatNunber: String,
        fare: Number
    }],
    passengerCount: Number,
    totalPrice: Number,
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
    remarks: String
}, {
    timestamps: true
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;