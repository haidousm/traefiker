import prisma from "../utils/db";

export const findContainerInfoById = (id: number) => {
    return prisma.containerInfo.findFirst({
        where: {
            id: id,
        },
    });
};

export const deleteContainerInfoById = (id: number) => {
    return prisma.containerInfo.delete({
        where: {
            id: id,
        },
    });
};
