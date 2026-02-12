import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI ?? '';

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: 'booking'
        });

        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error', error);
    }
}

export default connectMongoDB;