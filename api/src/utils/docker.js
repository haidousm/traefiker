const Docker = require("dockerode");
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

const createContainer = async (service, image) => {
    const pullStream = await docker.pull(image.resolvedName);
    docker.modem.followProgress(pullStream, async () => {
        const labels = service.getServiceLabels();
        const labelObj = {};

        labels.forEach((element) => {
            labelObj[element.split("=")[0]] = element.split("=")[1];
        });

        if (service.containerId) {
            await deleteContainer(service);
        }

        const container = await docker.createContainer({
            Image: image.resolvedName,
            name: service.tag,
            Labels: labelObj,
            HostConfig: {
                NetworkMode: service.network,
            },
        });
        service.containerId = container.id;
        service.status = "created";
        await service.save();
    });
};

const startContainer = async (service) => {
    const container = docker.getContainer(service.containerId);
    await container.start();
    service.status = "running";
    await service.save();
};

const stopContainer = async (service) => {
    const container = docker.getContainer(service.containerId);
    await container.stop();
    service.status = "stopped";
    await service.save();
};

const deleteContainer = async (service) => {
    const container = docker.getContainer(service.containerId);
    const containerState = (await container.inspect()).State;
    if (containerState.Running) {
        await container.stop();
    }
    await container.remove();
};

const getContainerHealth = async (service) => {
    const container = docker.getContainer(service.containerId);
    const data = await container.inspect();
    return data.State;
};

const updateContainer = async (service, image) => {
    const labels = service.getServiceLabels();
    const labelObj = {};

    labels.forEach((element) => {
        labelObj[element.split("=")[0]] = element.split("=")[1];
    });

    await deleteContainer(service);
    const container = await docker.createContainer({
        Image: image.resolvedName,
        name: service.tag,
        Labels: labelObj,
        HostConfig: {
            NetworkMode: service.network,
        },
    });
    service.containerId = container.id;
    service.status = "created";
    await service.save();
};

const getAllContainers = async () => {
    const containers = await docker.listContainers({
        all: true,
    });
    return containers;
};

const getAllImages = async () => {
    const images = await docker.listImages();
    return images;
};

module.exports = {
    createContainer,
    startContainer,
    stopContainer,
    deleteContainer,
    getContainerHealth,
    updateContainer,
    getAllContainers,
    getAllImages,
};
