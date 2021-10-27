import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const WalletSchema = new Schema(
    {
        address: {
            type: String,
            required: true
        },
        balance: {
            type: String,
            default: "0"
        },
        linked: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: false
        },
        passwordExpiry: {
            type: Date,
            required: false
        }
    },
    { timestamps: true }
);

export default mongoose.model('wallet', WalletSchema);