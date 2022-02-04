import mongoose from "mongoose";

interface UserModel extends mongoose.Document {
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
