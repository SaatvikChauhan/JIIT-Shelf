import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (error) {
        console.error("Database connection failed:", error.name);
        process.exit(1);
    }
}

export default connectDB;
