import mongoose from "mongoose";
import Reward from "./reward.js";
import { LocationSchema } from "./location.js";
import User from "./user.js";

const Schema = mongoose.Schema;
const TreasureSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        location: {
            type: LocationSchema,
            required: false
        },
        creator: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        hint: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        file: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

TreasureSchema.methods.howManyCollected = async function () {
    const allRewards = await Reward.find({ treasureId: this._id, collected: true });
    return allRewards.length;
};

TreasureSchema.methods.checkIfAlreadyCollected = async function (userId) {
    return await Reward.exists({ treasureId: this._id, finder: userId });
};

TreasureSchema.methods.getCreator = async function () {
    return await User.findOne({ chatId: this.creator });
};

export default mongoose.model('treasure', TreasureSchema);