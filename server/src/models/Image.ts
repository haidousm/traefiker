import mongoose from "mongoose";
import { Image } from "../types/Image";

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    repository: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ImageModel = mongoose.model<Image>("Image", imageSchema);
export default ImageModel;
