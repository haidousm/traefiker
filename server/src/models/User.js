const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
});

UserSchema.set("toJSON", {
    virtuals: true,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
