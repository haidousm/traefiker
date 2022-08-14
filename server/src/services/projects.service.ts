import { Prisma } from "@prisma/client";
import prisma from "../utils/db";

export const findAllProjects = () => {
    return prisma.project.findMany();
};

export const findProjectByName = (name: string) => {
    return prisma.project.findFirst({
        where: {
            name,
        },
    });
};

export const createProject = (project: Prisma.ProjectCreateInput) => {
    return prisma.project.create({
        data: project,
    });
};

export const deleteProjectByName = (name: string) => {
    return prisma.project.delete({
        where: {
            name,
        },
    });
};

// export const findAllProjects = async () => {
//     const internalProjects: Internal_ProjectDocument[] =
//         await ProjectModel.find({}).exec();
//     return internalProjects.map((internalProject) =>
//         internalProjectToProject(internalProject)
//     );
// };
// export const findProjectByName = async (name: string) => {
//     const internalProject = await ProjectModel.findOne({ name }).exec();
//     if (!internalProject) {
//         return null;
//     }
//     return internalProjectToProject(internalProject);
// };

// export const saveProject = async (project: Project) => {
//     const internalProject = await ProjectModel.findById(project.id).exec();
//     if (!internalProject) {
//         throw new Error("project not found");
//     }
//     internalProject.name = project.name;
//     await internalProject.save();
//     return internalProjectToProject(internalProject);
// };

// export const createProject = async (name: string) => {
//     if (await findProjectByName(name)) {
//         throw new Error(`Project ${name} already exists`);
//     }
//     const internalProject = await new ProjectModel({
//         name: name,
//     }).save();

//     return internalProjectToProject(internalProject);
// };

// export const deleteProjectByName = async (name: string) => {
//     const internalProject = await ProjectModel.findOne({ name }).exec();
//     if (!internalProject) {
//         throw new Error("Project not found");
//     }
//     await internalProject.remove();
// };

// const internalProjectToProject = (
//     internalProject: Internal_ProjectDocument
// ): Project => {
//     return {
//         id: internalProject._id.toString(),
//         name: internalProject.name,
//     };
// };
