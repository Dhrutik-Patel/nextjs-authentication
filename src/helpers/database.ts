import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI!,
            {}
        );

        console.log(`MongoDB Connected: ${connection.host}`);
    } catch (error: any) {
        throw new Error(`Error connecting to MongoDB: ${error.message}`);
    }
};

export default connectDB;
