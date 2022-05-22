import mongoose from "mongoose";

export interface Internal_ServerDocument {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    host: string;
    port: number;
    username: string;
    privateKey: string;
    createdAt: Date;
}

const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    host: {
        type: String,
        required: true,
    },
    port: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const ServerModel = mongoose.model<Internal_ServerDocument>(
    "Server",
    serverSchema
);
export default ServerModel;
