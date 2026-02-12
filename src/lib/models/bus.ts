import mongoose, { Schema } from 'mongoose';

const busSchema = new mongoose.Schema({
    busNumber: String,
    plateNumber: String,
    capacity: Number,
    active: Boolean,
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'BusClass' }
}, {
    timestamps: true
});

const Bus = mongoose.models.Bus || mongoose.model('Bus', busSchema);

export default Bus;