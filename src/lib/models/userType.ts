import mongoose from 'mongoose';

const userTypeSchema = new mongoose.Schema({
    name: String,
    description: String,
    active: Boolean
}, {
    timestamps: true
});

const UserType = mongoose.models.UserType || mongoose.model('UserType', userTypeSchema);

export default UserType;