import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    rate: Number,
    active: Boolean,
    remarks: String
}, {
    timestamps: true
});

const Route = mongoose.models.Route || mongoose.model('Route', routeSchema);

export default Route;