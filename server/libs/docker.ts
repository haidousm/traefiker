import Docker, { Container } from "dockerode";
import { ServiceStatus } from "../src/types/enums/ServiceStatus";
import { Image } from "../src/types/Image";
import { Service } from "../src/types/Service";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

export const pullImage = async (
    image: Image
): Promise<NodeJS.ReadableStream> => {
    const imageIdentifier =
        image.repository != "_"
            ? `${image.repository}/${image.name}:${image.tag}`
            : `${image.name}:${image.tag}`;

    return docker.pull(imageIdentifier);
};

export const createContainer = async (
    service: Service,
    image: Image,
    onSuccess: (service: Service, container: Container) => void,
    onError: (service: Service, error: unknown) => void
): Promise<void> => {
    try {
        const stream = await pullImage(image);
        docker.modem.followProgress(stream, async (error) => {
            if (error) {
                return onError(service, error);
            }
            const imageIdentifier =
                image.repository != "_"
                    ? `${image.repository}/${image.name}:${image.tag}`
                    : `${image.name}:${image.tag}`;
            const hostLabels = transformHostsToLabel(
                service.name,
                service.hosts
            );

            const labels = {
                ...hostLabels,
            };

            const container = await docker.createContainer({
                Image: imageIdentifier,
                name: `traefiker_${service.name}`,
                Labels: labels,
                HostConfig: {
                    NetworkMode: "traefiker",
                },
            });
            return onSuccess(service, container);
        });
    } catch (e) {
        return onError(service, e);
    }
};

export const startContainer = async (service: Service) => {
    if (!service.containerId) {
        throw new Error("Container id is not set");
    }
    const container = docker.getContainer(service.containerId);
    return container.start();
};

export const stopContainer = async (service: Service) => {
    if (!service.containerId) {
        throw new Error("Container id is not set");
    }
    const container = docker.getContainer(service.containerId);
    return container.stop();
};

export const deleteContainer = async (service: Service) => {
    if (!service.containerId) {
        throw new Error("Container id is not set");
    }
    if (service.status == ServiceStatus.RUNNING) {
        await stopContainer(service);
    }
    const container = docker.getContainer(service.containerId);
    service.containerId = undefined;
    return container.remove();
};

const transformHostsToLabel = (name: string, hosts: string[]) => {
    const labelKey = `traefik.http.routers.${name}.rule`;
    const formattedHosts = hosts.map((host) => {
        const [hostname, path] = host.split("/");
        const formattedHost = `Host(\`${hostname}\`)`;
        if (path) {
            return `${formattedHost} && PathPrefix(\`/${path}\`)`;
        }
        return formattedHost;
    });
    return {
        [labelKey]: formattedHosts.join(" || "),
    };
};
