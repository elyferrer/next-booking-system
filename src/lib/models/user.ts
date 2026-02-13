import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    email: String,
    mobile: String,
    username: String,
    password: String,
    emailVerifiedAt: Date,
    userType: { type: mongoose.Schema.Types.ObjectId, ref: 'UserType' },
    active: Boolean
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;