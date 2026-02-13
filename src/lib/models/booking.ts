import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    outboundSchedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
    returnSchedule: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Schedule' },
    passengers: [{ 
        lastName: String, 
        firstName: String, 
        discounted: Boolean, 
        seatNumber: String,
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