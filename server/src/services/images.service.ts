import ImageModel from "../models/Image";
import { Image } from "../types/Image";

export const findImageById = async (imageId: string) => {
    return await ImageModel.findById(imageId).exec();
};
export const findImageByImageIdentifier = async (identifier: string) => {
    const { repository, name, tag } = parseImageIdentifier(identifier);
    return await ImageModel.findOne({
        repository,
        name,
        tag,
    }).exec();
};

export const createImageByImageIdentifier = async (
    identifier: string
): Promise<Image> => {
    const { repository, name, tag } = parseImageIdentifier(identifier);
    const image = new ImageModel({
        name,
        tag,
        repository,
    });
    return await image.save();
};

export const getOrCreateImageByImageIdentifier = async (
    imageIdentifier: string
) => {
    const image = await findImageByImageIdentifier(imageIdentifier);
    if (!image) {
        return await createImageByImageIdentifier(imageIdentifier);
    }
    return image;
};

export const deleteAllImages = async () => {
    return ImageModel.deleteMany({}).exec();
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
