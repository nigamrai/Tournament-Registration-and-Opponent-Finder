import mongoose from "mongoose";
import {} from 'dotenv/config'

const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URI);
        if (connection) {
            console.log(`Connected to MongoDB: ${connection.host}`);
            console.log(`Database: ${connection.name}`);
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectDB;