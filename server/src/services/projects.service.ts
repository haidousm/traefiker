import ProjectModel from "../models/Project";

export const findProjectByName = async (name: string) => {
    return ProjectModel.findOne({ name }).exec();
};
