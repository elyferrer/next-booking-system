import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
    name: String,
    description: String,
    active: Boolean
}, {
    timestamps: true
});

const Status = mongoose.models.status || mongoose.model('BusClass', statusSchema);

export default Status;