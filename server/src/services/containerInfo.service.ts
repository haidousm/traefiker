import { Prisma } from "@prisma/client";
import prisma from "../utils/db";

export const findContainerInfoById = (id: number) => {
    return prisma.containerInfo.findFirst({
        where: {
            id: id,
        },
    });
};

export const createContainerInfo = (
    containerInfo: Prisma.ContainerInfoCreateInput
) => {
    return prisma.containerInfo.create({
        data: containerInfo,
    });
};
export const deleteContainerInfoById = (id: number) => {
    return prisma.containerInfo.delete({
        where: {
            id: id,
        },
    });
};
