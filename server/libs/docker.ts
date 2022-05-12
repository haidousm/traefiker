import Docker, { Container } from "dockerode";
import { Image } from "../src/types/Image";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

export const pullImage = async (image: Image): Promise<void> => {
    const imageIdentifier =
        image.repository != "_"
            ? `${image.repository}/${image.name}:${image.tag}`
            : `${image.name}:${image.tag}`;
    return new Promise((resolve, reject) => {
        docker.pull(imageIdentifier, {}, async (err, stream) => {
            if (err) {
                return reject(err);
            }
            docker.modem.followProgress(stream, async () => {
                return resolve();
            });
        });
    });
};

export const createContainer = async (
    name: string,
    hosts: string[],
    image: Image
): Promise<Container> => {
    const imageIdentifier =
        image.repository != "_"
            ? `${image.repository}/${image.name}:${image.tag}`
            : `${image.name}:${image.tag}`;
    const hostLabels = transformHostsToLabel(name, hosts);

    const labels = {
        ...hostLabels,
    };

    return docker.createContainer({
        Image: imageIdentifier,
        name: `traefiker_${name}`,
        Labels: labels,
        HostConfig: {
            NetworkMode: "traefiker",
        },
    });
};

// export const createContainer = async (
//     service: ServiceDocument
// ): Promise<Dockerode.Container> => {
//     const image = service.image as unknown as ImageDocument;
//     return new Promise((resolve) => {
//         docker.pull(image.identifier, {}, async (_err, stream) => {
//             docker.modem.followProgress(stream, async () => {
//                 const labels = service.getServiceLabels();
//                 const labelObj = transformLabelsToObject(service.name, labels);

//                 if (service.containerId) {
//                     await deleteContainer(service);
//                 }
//                 resolve(
//                     docker.createContainer({
//                         Image: image.identifier,
//                         name: service.tag,
//                         Labels: labelObj,
//                         HostConfig: {
//                             NetworkMode: service.network,
//                         },
//                     })
//                 );
//             });
//         });
//     });
// };

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
