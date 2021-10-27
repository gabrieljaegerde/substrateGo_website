import mongoose from "mongoose";
import { WalletSchema } from "./wallet.js";

const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
            required: false
        },
        chatId: {
            type: Number,
            required: true,
            index: true,
            unique: true,
        },
        language: {
            type: String,
            default: "en",
        },
        type: {
            type: String,
            enum: ["private", "group"],
            required: true
        },
        isBot: {
            type: Boolean,
        },
        totalRewardBalance: {
            type: String,
            required: true,
            default: "0"
        },
        rewardBalance: {
            type: String,
            required: true,
            default: "0"
        },
        wallet: {
            type: WalletSchema,
            required: false
        },
        oldWallets: {
            type: [WalletSchema],
            default: []
        },
        blocked: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true },
);

export default mongoose.model('user', UserSchema);