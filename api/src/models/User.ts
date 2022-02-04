import mongoose, { Types } from "mongoose";

interface UserModel {
    id: Types.ObjectId;
    username: string;
    hash: string;
    salt: string;
}

const UserSchema = new mongoose.Schema<UserModel>({
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

const User = mongoose.model<UserModel>("User", UserSchema);
export { User, UserModel };
