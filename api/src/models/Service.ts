import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Service", ServiceSchema);
