/* THIS ASSUMES A DB & DOCKER ENGINE CONNECTIONs HAVE BEEN MADE */
const Service = require("../models/Service");
const Image = require("../models/Image");

const {
    parseResolvedName,
    parseHostLabels,
    parseRedirectLabels,
    parseTraefikerLabels,
} = require("./services");
const { getAllContainers, getAllImages } = require("./docker");

const createImages = async () => {
    const images = await getAllImages();
    const imagePromises = images.map(async (image) => {
        const resolvedName = image.RepoTags[0];
        const { repository, imageName, tag } = parseResolvedName(resolvedName);
        if (imageName.includes("traefik") || imageName.includes("traefiker")) {
            return Promise.resolve();
        }
        const newImage = new Image({
            repository,
            name: imageName,
            tag,
            resolvedName,
        });
        return newImage.save();
    });
    return await Promise.all(imagePromises);
};

const createContainers = async (images) => {
    const containers = await getAllContainers();
    const containerPromises = containers.map(async (container, i) => {
        if (
            container.Image.includes("traefik") ||
            container.Image.includes("traefiker")
        ) {
            return Promise.resolve();
        }
        const image = images.find(
            (image) => image.resolvedName === container.Image
        );
        const serviceName = container.Names[0].replace("/", "");

        const labels = Object.keys(container.Labels).map(
            (key) => `${key}=${container.Labels[key]}`
        );

        const hosts = parseHostLabels(labels);
        const redirects = parseRedirectLabels(labels);
        const traefikerLabels = parseTraefikerLabels(labels);

        const service = new Service({
            name: serviceName,
            status: container.State == "running" ? "running" : "stopped",
            image: image._id,
            hosts: hosts,
            redirects: redirects,
            order: i,
            tag: traefikerLabels.tag === "" ? serviceName : traefikerLabels.tag,
            containerId: container.Id,
            network: container.HostConfig.NetworkMode,
        });
        return await service.save();
    });
    return await Promise.all(containerPromises);
};

const useDockerAsSourceOfTruth = async () => {
    await Service.deleteMany({});
    await Image.deleteMany({});

    await createImages();
    const images = await Image.find();
    await createContainers(images);
};

module.exports = { useDockerAsSourceOfTruth };
