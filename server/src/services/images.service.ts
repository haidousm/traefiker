import ImageModel from "../models/Image";

export const findImageById = (imageId: string) => {
    return ImageModel.findById(imageId).exec();
};
export const findImageByImageIdentifier = (identifier: string) => {
    return ImageModel.findOne({ identifier }).exec();
};

export const createImageByImageIdentifier = (identifier: string) => {
    const { repository, imageName, tag } = parseImageIdentifier(identifier);
    const image = new ImageModel({
        name: imageName,
        tag,
        repository,
        identifier,
    });
    return image.save();
};

export const getOrCreateImageByImageIdentifier = async (
    imageIdentifier: string
) => {
    let image = await findImageByImageIdentifier(imageIdentifier);
    if (!image) {
        image = await createImageByImageIdentifier(imageIdentifier);
    }
    return image;
};

const parseImageIdentifier = (imageIdentifier: string) => {
    const regex = /^(.+)\/(.+):(.+)$|^(.+):(.+)$|^(.+)\/(.+)|^(.+)$/;
    const match = regex.exec(imageIdentifier);

    if (match) {
        const repository = match[1] ?? match[6] ?? "_";
        const imageName = match[2] ?? match[4] ?? match[7] ?? match[8];
        const tag = match[3] ?? match[5] ?? "latest";

        return {
            repository,
            imageName,
            tag,
        };
    }
    throw new Error(`Invalid image identifier: ${imageIdentifier}`);
};
