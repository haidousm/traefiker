import { FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "../models/User";
import { generateSalt, generateHash } from "../utils/password";

/* istanbul ignore next */
export const findUser = async (query: FilterQuery<UserDocument>) => {
    return UserModel.findOne(query);
};

/* istanbul ignore next */
export const createUser = (username: string, password: string) => {
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    const user = new UserModel({
        username: username,
        hash,
        salt,
    });
    return user.save();
};
