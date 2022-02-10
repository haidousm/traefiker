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

        labelObj[`traefik.http.routers.${service.name}.tls`] = "true";
        labelObj[`traefik.http.routers.${service.name}.tls.certresolver`] =
            "lets-encrypt";

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
    const containers = await getAllContainers();
    const oldContainer = containers.find(
        (container) => container.Id === service.containerId
    );

    const containerLabels = oldContainer.Labels;

    const labels = service.getServiceLabels();
    labels.forEach((element) => {
        containerLabels[element.split("=")[0]] = element.split("=")[1];
    });

    const environments = service.getEnvironments();

    const portBindings = {};
    if (oldContainer.Ports.length > 0) {
        oldContainer.Ports.forEach((port) => {
            const { PrivatePort, PublicPort, Type } = port;
            if (PrivatePort === undefined || PublicPort === undefined) {
                return;
            }
            portBindings[`${PrivatePort}/${Type}`] = [
                {
                    HostPort: `${PublicPort}`,
                },
            ];
        });
    }

    const hostConfig = {
        NetworkMode: service.network,
    };

    if (portBindings && Object.keys(portBindings).length > 0) {
        hostConfig.PortBindings = portBindings;
    }

    Object.keys(containerLabels).map((key) => {
        if (!containerLabels[key] || containerLabels[key] === "") {
            delete containerLabels[key];
        }
    });
    await deleteContainer(service);

    const container = await docker.createContainer({
        Image: image.resolvedName,
        name: service.name,
        Labels: containerLabels,
        HostConfig: hostConfig,
        Env: environments,
    });
    service.containerId = container.id;
    service.status = "created";
    await service.save();
};

const getContainer = (containerId) => {
    return docker.getContainer(containerId);
};

const inspectContainer = async (containerId) => {
    const container = docker.getContainer(containerId);
    return await container.inspect();
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
    getContainer,
    inspectContainer,
};
