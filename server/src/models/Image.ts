import mongoose from "mongoose";

export interface Internal_ImageDocument {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    tag: string;
    repository: string;
    createdAt: Date;
}

const ImageSchema = new mongoose.Schema<Internal_ImageDocument>({
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

const ImageModel = mongoose.model<Internal_ImageDocument>("Image", ImageSchema);
export default ImageModel;
