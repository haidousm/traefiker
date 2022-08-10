import { Prisma } from "@prisma/client";
import prisma from "../utils/db";

export const findRedirectsByServiceId = (serviceId: number) => {
    return prisma.redirect.findMany({
        where: {
            serviceId,
        },
    });
};
export const createRedirect = (redirect: Prisma.RedirectCreateInput) => {
    return prisma.redirect.create({
        data: redirect,
    });
};
