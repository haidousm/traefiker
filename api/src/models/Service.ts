import mongoose from "mongoose";

interface ServiceModel extends mongoose.Document {
    name: string;
    image: string;
    hosts: string[];
    order: number;
    createdAt: Date;
}

const ServiceSchema = new mongoose.Schema<ServiceModel>({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    hosts: {
        type: [String],
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ServiceSchema.set("toJSON", {
    virtuals: true,
});

const Service = mongoose.model<ServiceModel>("Service", ServiceSchema);

export { ServiceModel, Service };
