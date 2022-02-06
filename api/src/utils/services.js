const Image = require("../models/Image");
const Service = require("../models/Service");
const { deleteContainer } = require("./docker");

const getOrCreateImage = async (resolvedName) => {
    const regex = /^(.+)\/(.+):(.+)$|^(.+):(.+)$|^(.+)/;
    const match = regex.exec(resolvedName);
    if (!match) {
        return -1;
    }

    const repository = match[1] ?? "_";
    const imageName = match[2] ?? match[4] ?? match[6];
    const tag = match[3] ?? match[5] ?? "latest";

    let image = await Image.findOne({
        repository,
        name: imageName,
        tag,
    });

    if (!image) {
        image = new Image({
            repository,
            name: imageName,
            tag,
            resolvedName,
        });
        await image.save();
    }

    return image;
};

const createService = async (serviceRequest, image) => {
    const service = new Service({
        name: serviceRequest.name,
        status: "pulling",
        image: image._id,
        hosts: serviceRequest.hosts,
        order: serviceRequest.order,
        tag: `traefiker_${serviceRequest.name}`,
    });

    const oldService = await Service.findOne({
        name: service.name,
    });

    if (oldService) {
        if (oldService.containerId) {
            await deleteContainer(oldService);
        }
        await oldService.remove();
    }
    await service.save();
    return service;
};

module.exports = {
    getOrCreateImage,
    createService,
};
