const mongoose = require("mongoose");

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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ImageSchema.set("toJSON", {
    virtuals: true,
});

const Service = mongoose.model("Service", ImageSchema);
module.exports = Service;
