import Docker, { Container } from "dockerode";
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
    callback: (service: Service, container: Container) => void
): Promise<void> => {
    const stream = await pullImage(image);
    docker.modem.followProgress(stream, async () => {
        const imageIdentifier =
            image.repository != "_"
                ? `${image.repository}/${image.name}:${image.tag}`
                : `${image.name}:${image.tag}`;
        const hostLabels = transformHostsToLabel(service.name, service.hosts);

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
        callback(service, container);
    });
};

// const deleteContainer = async (service: ServiceDocument) => {
//     const container = docker.getContainer(service.containerId);
//     const containerState = (await container.inspect()).State;
//     if (containerState.Running) {
//         await container.stop();
//     }
//     return container.remove();
// };

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
