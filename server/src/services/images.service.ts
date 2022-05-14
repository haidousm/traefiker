import ImageModel, { Internal_ImageDocument } from "../models/Image";
import { Image } from "../types/Image";

export const findImageById = (imageId: string) => {
    return ImageModel.findById(imageId).exec();
};
export const findImageByImageIdentifier = async (
    identifier: string
): Promise<Image> => {
    const { repository, name, tag } = parseImageIdentifier(identifier);
    const internalImage = await ImageModel.findOne({
        repository,
        name,
        tag,
    }).exec();
    if (internalImage) {
        return internalImageToImage(internalImage);
    }
    throw new Error(`Image not found: ${identifier}`);
};

export const createImageByImageIdentifier = async (
    identifier: string
): Promise<Image> => {
    const { repository, name, tag } = parseImageIdentifier(identifier);
    const internalImage = new ImageModel({
        name,
        tag,
        repository,
    });
    await internalImage.save();
    return internalImageToImage(internalImage);
};

export const getOrCreateImageByImageIdentifier = async (
    imageIdentifier: string
) => {
    try {
        return await findImageByImageIdentifier(imageIdentifier);
    } catch (e) {
        return await createImageByImageIdentifier(imageIdentifier);
    }
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

const internalImageToImage = (internalImage: Internal_ImageDocument) => {
    return {
        id: internalImage._id.toString(),
        name: internalImage.name,
        tag: internalImage.tag,
        repository: internalImage.repository,
    };
};
