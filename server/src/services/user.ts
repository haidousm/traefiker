import { FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "../models/User";

export const findUser = (query: FilterQuery<UserDocument>) => {
    return UserModel.findOne(query).lean();
};
