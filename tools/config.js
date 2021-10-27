import mongoose from "mongoose";

export const getDb = async () => {
    const uri = process.env.MONGO_URI;
    try {
        await mongoose.connect(uri);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.log(err);
    }
};