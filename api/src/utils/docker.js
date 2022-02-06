const Docker = require("dockerode");
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

const createContainer = async (service, image) => {
    const pullStream = await docker.pull(image.resolvedName);
    docker.modem.followProgress(pullStream, async () => {
        const container = await docker.createContainer({
            Image: image.resolvedName,
            name: service.tag,
        });
        service.containerId = container.id;
        await service.save();
    });
};

const startContainer = async (service) => {
    const container = docker.getContainer(service.containerId);
    await container.start();
};

const stopContainer = async (service) => {
    const container = docker.getContainer(service.containerId);
    await container.stop();
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

module.exports = {
    createContainer,
    startContainer,
    stopContainer,
    deleteContainer,
    getContainerHealth,
};
