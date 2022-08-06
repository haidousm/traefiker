import { Prisma } from "@prisma/client";
import prisma from "../utils/db";

const SERVICE_INCLUDE_OBJ = {
    image: true,
    environmentVariables: true,
    redirects: true,
    containerInfo: true,
};

export const findAllServices = () => {
    return prisma.service.findMany({
        include: SERVICE_INCLUDE_OBJ,
    });
};

export const findServiceByName = (name: string) => {
    return prisma.service.findUnique({
        where: {
            name,
        },
        include: SERVICE_INCLUDE_OBJ,
    });
};

export const createService = (service: Prisma.ServiceCreateInput) => {
    return prisma.service.create({
        data: service,
        include: SERVICE_INCLUDE_OBJ,
    });
};

export const updateService = (
    name: string,
    service: Omit<
        PopulatedService,
        "id" | "imageId" | "containerInfoId" | "userId"
    >
) => {
    return prisma.service.update({
        where: { name },
        data: {
            ...service,
            image: { connect: service.image },
            environmentVariables: { connect: service.environmentVariables },
            redirects: { connect: service.redirects },
            containerInfo: undefined,
        },
        include: SERVICE_INCLUDE_OBJ,
    });
};

export const deleteServiceByName = (name: string) => {
    return prisma.service.delete({ where: { name } });
};

export const deleteAllServices = () => {
    return prisma.service.deleteMany();
};

/*TODO: find a better place for this later */

export type PopulatedService = Exclude<
    Prisma.PromiseReturnType<typeof findServiceByName>,
    null
>;
