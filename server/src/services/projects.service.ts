import ProjectModel from "../models/Project";
import { Internal_ProjectDocument } from "../models/Project";
import { Project } from "../types/Project";

export const findAllProjects = async () => {
    const internalProjects: Internal_ProjectDocument[] =
        await ProjectModel.find({}).exec();
    return internalProjects.map((internalProject) =>
        internalProjectToProject(internalProject)
    );
};
export const findProjectByName = async (name: string) => {
    const internalProject = await ProjectModel.findOne({ name }).exec();
    if (!internalProject) {
        return null;
    }
    return internalProjectToProject(internalProject);
};

export const createProject = async (name: string) => {
    if (await findProjectByName(name)) {
        throw new Error(`Project ${name} already exists`);
    }
    const internalProject = await new ProjectModel({
        name: name,
    }).save();

    return internalProjectToProject(internalProject);
};

export const deleteProjectByName = async (name: string) => {
    const internalProject = await ProjectModel.findOne({ name }).exec();
    if (!internalProject) {
        throw new Error("Project not found");
    }
    await internalProject.remove();
};

const internalProjectToProject = (
    internalProject: Internal_ProjectDocument
): Project => {
    return {
        id: internalProject._id.toString(),
        name: internalProject.name,
    };
};
