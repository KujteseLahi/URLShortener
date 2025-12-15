import mongoose from "mongoose";
import {generateShortId} from "../utils/generateShortId.ts";

export interface UrlDocument extends Document {
    fullUrl: string;
    shortUrl: string;
    clicks: number;
    save(): UrlDocument;
    expiration?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}



const shortUrlSchema = new mongoose.Schema(
    {
        fullUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true,
            default: () => generateShortId(),

        },
        clicks: {
            type: Number,
            default: 0,
        },
        expiration: { type: Date, default: null , index: { expireAfterSeconds: 0 },},
    },
    {
        timestamps: true,
    }
);

export const urlModel = mongoose.model<UrlDocument>(
    "ShortUrl",
    shortUrlSchema
);