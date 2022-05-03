import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    username: string;
    hash: string;
    salt: string;
}

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

const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
