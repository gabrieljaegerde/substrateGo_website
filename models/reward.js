//import mongoose, { Types, Document } from "mongoose";
import mongoose from 'mongoose';
const { Types, Document } = mongoose;

const Schema = mongoose.Schema;
const RewardSchema = new Schema(
    {
        treasureId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Treasure',
            required: true
        },
        finder: {
            type: Number,
            required: true
        },
        collected: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            required: false,
        },
        expiry: {
            type: Date,
            required: true,
        },
        dateCollected: {
            type: Date,
            required: false,
        },
        txHash: {
            type: String,
            required: false
        },
        block: {
            type: Number,
            required: false
        },
        file: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true },
);

RewardSchema.methods.setCollected = function (txHash,
    block,
    metadataCid) {
    this.collected = true;
    this.dateCollected = new Date();
    this.txHash = txHash;
    this.block = block;
    this.file = metadataCid;
};

export default mongoose.model('reward', RewardSchema);