import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const LocationSchema = new Schema(
    {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);
export default mongoose.model('location', LocationSchema);