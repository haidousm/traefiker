import { Prisma, Service } from "@prisma/client";
import prisma from "../utils/db";

export const findAllServices = () => {
    return prisma.service.findMany({});
};

export const findServiceByName = (name: string) => {
    return prisma.service.findUnique({
        where: {
            name,
        },
    });
};

export const createService = (service: Prisma.ServiceCreateInput) => {
    return prisma.service.create({
        data: service,
    });
};

export const updateService = (name: string, service: Service) => {
    return prisma.service.update({
        where: { name },
        data: service,
    });
};

export const deleteServiceByName = (name: string) => {
    return prisma.service.delete({ where: { name } });
};

export const deleteAllServices = () => {
    return prisma.service.deleteMany();
};

export const findAllServicesPopulated = () => {
    return prisma.service.findMany({
        include: {
            image: true,
            project: true,
            containerInfo: true,
            environmentVariables: true,
            redirects: true,
        },
    });
};
