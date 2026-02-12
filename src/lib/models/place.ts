import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
    name: String,
    description: String,
    active: Boolean
}, {
    timestamps: true
});

const Place = mongoose.models.Place || mongoose.model('Place', placeSchema);

export default Place;