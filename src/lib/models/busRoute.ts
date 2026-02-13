import mongoose from 'mongoose';

const busRouteSchema = new mongoose.Schema({
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    rate: Number,
    active: Boolean,
    remarks: String
}, {
    timestamps: true
});

const BusRoute = mongoose.models.BusRoute || mongoose.model('BusRoute', busRouteSchema);

export default BusRoute;