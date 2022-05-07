import Docker from "dockerode";
import { ServiceDocument } from "../src/schemas/services.schema";
import { ImageDocument } from "../src/schemas/images.schema";
import Dockerode from "dockerode";
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

export const createContainer = async (
    service: ServiceDocument,
    image: ImageDocument
): Promise<Dockerode.Container> => {
    return new Promise((resolve) => {
        docker.pull(image.identifier, {}, async (_err, stream) => {
            docker.modem.followProgress(stream, async () => {
                const labels = service.getServiceLabels();
                const labelObj = transformLabelsToObject(service.name, labels);

                if (service.containerId) {
                    await deleteContainer(service);
                }
                resolve(
                    docker.createContainer({
                        Image: image.identifier,
                        name: service.tag,
                        Labels: labelObj,
                        HostConfig: {
                            NetworkMode: service.network,
                        },
                    })
                );
            });
        });
    });
};

const deleteContainer = async (service: ServiceDocument) => {
    const container = docker.getContainer(service.containerId);
    const containerState = (await container.inspect()).State;
    if (containerState.Running) {
        await container.stop();
    }
    return container.remove();
};

const transformLabelsToObject = (serviceName: string, labels: string[]) => {
    labels.push(`traefik.http.routers.${serviceName}.tls=true`);
    labels.push(
        `traefik.http.routers.${serviceName}.tls.certresolver=lets-encrypt`
    );
    return labels.reduce(
        (acc, label) => ({
            ...acc,
            [label.split("=")[0]]: label.split("=")[1],
        }),
        {}
    );
};
