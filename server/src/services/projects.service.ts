import ProjectModel from "../models/Project";
import { Internal_ProjectDocument } from "../models/Project";
import { Project } from "../types/Project";

export const findProjectByName = async (name: string) => {
    const internalProject = await ProjectModel.findOne({ name }).exec();
    if (!internalProject) {
        return null;
    }
    return internalProjectToProject(internalProject);
};

const internalProjectToProject = (
    internalProject: Internal_ProjectDocument
): Project => {
    return {
        id: internalProject._id.toString(),
        name: internalProject.name,
    };
};
