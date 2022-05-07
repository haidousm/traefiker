import ImageModel from "../models/Image";

export const findImageByImageIdentifier = (identifier: string) => {
    return ImageModel.findOne({ identifier });
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
