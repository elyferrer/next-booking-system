import mongoose from 'mongoose';

const busClassSchema = new mongoose.Schema({
    name: String,
    description: String,
    active: Boolean
}, {
    timestamps: true
});

const BusClass = mongoose.models.BusClass || mongoose.model('BusClass', busClassSchema);

export default BusClass;