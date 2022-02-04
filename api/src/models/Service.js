const mongoose = require("mongoose");

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
    dockerId: {
        type: String,
        required: false,
    },
    tag: {
        type: String,
        required: false,
    },
});

ServiceSchema.set("toJSON", {
    virtuals: true,
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
