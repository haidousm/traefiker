import mongoose from "mongoose";
import { ImageDocument } from "../schemas/images.schema";

const ImageSchema = new mongoose.Schema({
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
    identifier: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ImageSchema.set("toJSON", {
    virtuals: true,
});

const ImageModel = mongoose.model<ImageDocument>("Image", ImageSchema);
export default ImageModel;
