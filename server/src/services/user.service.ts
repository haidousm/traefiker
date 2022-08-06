import { Prisma } from "@prisma/client";
import prisma from "../utils/db";
import { generateSalt, generateHash } from "../utils/password";

export const findUser = (query: Prisma.UserWhereUniqueInput) => {
    return prisma.user.findUnique({
        where: query,
    });
};

export const createUser = (username: string, password: string) => {
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    return prisma.user.create({
        data: {
            username,
            salt,
            hash,
        },
    });
};

export const deleteUser = async (query: Prisma.UserWhereUniqueInput) => {
    return prisma.user.delete({
        where: query,
    });
};
