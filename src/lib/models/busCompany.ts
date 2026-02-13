import mongoose from 'mongoose';

const busCompanySchema = new mongoose.Schema({
    name: String,
    description: String,
    active: Boolean,
    remarks: String
}, {
    timestamps: true
});

const BusCompany = mongoose.models.BusCompany || mongoose.model('BusCompany', busCompanySchema);

export default BusCompany;