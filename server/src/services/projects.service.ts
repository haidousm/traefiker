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

export const updateProjectByName = (
    name: string,
    project: Prisma.ProjectUpdateInput
) => {
    return prisma.project.update({
        where: {
            name,
        },
        data: project,
    });
};

export const findAllServicesByProjectName = async (name: string) => {
    const project = await prisma.project.findFirst({ where: { name } });
    return prisma.service.findMany({
        where: {
            projectId: project?.id,
        },
        include: {
            image: true,
            project: true,
            containerInfo: true,
            environmentVariables: true,
            redirects: true,
        },
    });
};
