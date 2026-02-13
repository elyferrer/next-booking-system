import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
    name: String,
    description: String,
    active: Boolean
}, {
    timestamps: true
});

const Status = mongoose.models.Status || mongoose.model('Status', statusSchema);

export default Status;