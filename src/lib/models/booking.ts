import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    outboundSchedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
    returnSchedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
    bookingDate: Date,
    passengers: [{ 
        lastName: String, 
        firstName: String, 
        discounted: Boolean, 
        seatNunber: String,
        fare: Number
    }],
    passengerCount: Number,
    totalPrice: Number,
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' }
}, {
    timestamps: true
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;