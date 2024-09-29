import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_URI }  = process.env;

const connectDB = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("Error while connecting to MongoDB", error);
        process.exit(1);
    }
}

export default connectDB;