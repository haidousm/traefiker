import prisma from "../utils/db";

export const findImageById = (imageId: number) => {
    return prisma.image.findUnique({
        where: { id: imageId },
    });
};
export const findImageByImageIdentifier = async (identifier: string) => {
    const { repository, name, tag } = parseImageIdentifier(identifier);
    return prisma.image.findUnique({
        where: {
            imageIdentifier: {
                repository,
                name,
                tag,
            },
        },
    });
};

export const createImageByImageIdentifier = async (identifier: string) => {
    const { repository, name, tag } = parseImageIdentifier(identifier);
    return prisma.image.create({
        data: {
            repository,
            name,
            tag,
        },
    });
};

export const getOrCreateImageByImageIdentifier = async (
    imageIdentifier: string
) => {
    const image = await findImageByImageIdentifier(imageIdentifier);
    if (!image) return await createImageByImageIdentifier(imageIdentifier);
    return image;
};

export const deleteAllImages = () => {
    return prisma.image.deleteMany();
};

const parseImageIdentifier = (imageIdentifier: string) => {
    const regex = /^(.+)\/(.+):(.+)$|^(.+):(.+)$|^(.+)\/(.+)|^(.+)$/;
    const match = regex.exec(imageIdentifier);

    if (match) {
        const repository = match[1] ?? match[6] ?? "_";
        const name = match[2] ?? match[4] ?? match[7] ?? match[8];
        const tag = match[3] ?? match[5] ?? "latest";

        return {
            repository,
            name,
            tag,
        };
    }
    throw new Error(`Invalid image identifier: ${imageIdentifier}`);
};
