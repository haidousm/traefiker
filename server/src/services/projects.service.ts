import { HydratedDocument } from "mongoose";
import ProjectModel from "../models/Project";
import { Project } from "../types/Project";

export const findAllProjects = async () => {
    return await ProjectModel.find({}).exec();
};
export const findProjectByName = async (name: string) => {
    return await ProjectModel.findOne({ name }).exec();
};

export const saveProject = async (project: Project) => {
    const hydratedProject = project as unknown as HydratedDocument<Project>;
    return await hydratedProject.save();
};

export const deleteProjectByName = async (name: string) => {
    const project = await ProjectModel.findOne({ name }).orFail().exec();
    await project.remove();
};
