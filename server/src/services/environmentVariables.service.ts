import { Prisma } from "@prisma/client";
import prisma from "../utils/db";

export const findEnvironmentVariablesByServiceId = (serviceId: number) => {
    return prisma.environmentVariable.findMany({
        where: {
            serviceId,
        },
    });
};

export const createEnvironmentVariable = (
    environmentVariable: Prisma.EnvironmentVariableCreateInput
) => {
    return prisma.environmentVariable.create({
        data: environmentVariable,
    });
};
