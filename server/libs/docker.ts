import Docker, {
    Container,
    ContainerInfo,
    ContainerInspectInfo,
} from "dockerode";
import { Image, Redirect, Service, ServiceStatus } from "@prisma/client";
import { findEnvironmentVariablesByServiceId } from "../src/services/environmentVariables.service";
import {
    deleteContainerInfoById,
    findContainerInfoById,
} from "../src/services/containerInfo.service";
import { findRedirectsByServiceId } from "../src/services/redirects.service";

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

            const redirects = await findRedirectsByServiceId(service.id);
            const labels = getAllLabels(service, redirects);

            const environmentVariables =
                await findEnvironmentVariablesByServiceId(service.id);
            const mappedEnvVars: string[] = environmentVariables.map(
                (env) => `${env.key}=${env.value}`
            );
            try {
                const container = await docker.createContainer({
                    Image: imageIdentifier,
                    name: `traefiker_${service.name}`,
                    Labels: labels,
                    HostConfig: {
                        NetworkMode: "web",
                    },
                    Env: mappedEnvVars,
                });
                return onSuccess(service, container);
            } catch (e) {
                return onError(service, e);
            }
        });
    } catch (e) {
        return onError(service, e);
    }
};

export const startContainer = async (service: Service) => {
    const containerInfo = await findContainerInfoById(service.containerInfoId!);
    if (!containerInfo || !containerInfo?.containerId) {
        throw new Error("Container id is not set");
    }
    const container = docker.getContainer(containerInfo.containerId);
    return container.start();
};

export const stopContainer = async (service: Service) => {
    const containerInfo = await findContainerInfoById(service.containerInfoId!);
    if (!containerInfo || !containerInfo?.containerId) {
        throw new Error("Container id is not set");
    }
    const container = docker.getContainer(containerInfo.containerId);
    const containerState = (await container.inspect()).State;
    if (!containerState.Running) {
        return;
    }
    return container.stop();
};

export const deleteContainer = async (service: Service) => {
    console.log(service);
    const containerInfo = await findContainerInfoById(service.containerInfoId!);
    if (!containerInfo || !containerInfo?.containerId) {
        throw new Error("Container id is not set");
    }
    if (containerInfo?.containerId) {
        throw new Error("Container id is not set");
    }
    if (service.status == ServiceStatus.RUNNING) {
        await stopContainer(service);
    }
    const container = docker.getContainer(containerInfo.containerId);
    await deleteContainerInfoById(service.containerInfoId!);
    return container.remove();
};

export const getAllContainers = async (): Promise<ContainerInfo[]> => {
    return docker.listContainers({ all: true });
};

export const deleteContainerByContainerId = async (
    containerId: string
): Promise<void> => {
    const container = docker.getContainer(containerId);
    const containerInfo = await container.inspect();
    if (containerInfo.State.Running) {
        await container.stop();
    }
    return container.remove();
};

export const inspectContainerById = async (
    containerId: string
): Promise<ContainerInspectInfo> => {
    return docker.getContainer(containerId).inspect();
};

const getSSLLabels = (name: string) => {
    return {
        [`traefik.http.routers.${name}.tls`]: "true",
        [`traefik.http.routers.${name}.tls.certresolver`]: "lets-encrypt",
    };
};

export const pruneSystem = async () => {
    await docker.pruneContainers({
        force: true,
    });
    await docker.pruneImages({
        all: true,
        force: true,
    });
};

const transformHostsToLabel = (name: string, hosts: string[]) => {
    const labelKey = `traefik.http.routers.${name}.rule`;
    const hostLabels = hosts.map((host) => {
        const [hostname, path] = host.split("/");
        const formattedHost = `Host(\`${hostname}\`)`;
        if (path) {
            return `${formattedHost} && PathPrefix(\`/${path}\`)`;
        }
        return formattedHost;
    });
    return {
        [labelKey]: hostLabels.join(" || "),
    };
};

const transformHostsToPathPrefixMiddlewareLabels = (
    name: string,
    hosts: string[]
) => {
    const hostsWithPaths = hosts.filter((host) => host.includes("/"));
    const paths = hostsWithPaths.map((host) => {
        const [, path] = host.split("/");
        return path;
    });

    const labels: { [key: string]: string } = {};
    paths.forEach((path) => {
        labels[
            `traefik.http.middlewares.${name}-${path}-prefix.stripprefix.prefixes`
        ] = `/${path}`;
    });
    return labels;
};

const transformRedirectsToMiddlewareLabels = (
    name: string,
    redirects: Redirect[]
) => {
    const labels: { [key: string]: string } = {};
    redirects.forEach((redirect: Redirect, i) => {
        const from = redirect.from;
        const to = redirect.to;

        labels[
            `traefik.http.middlewares.${i}-redirect-${name}.redirectregex.regex`
        ] = from;
        labels[
            `traefik.http.middlewares.${i}-redirect-${name}.redirectregex.replacement`
        ] = to;
    });
    return labels;
};

const getMiddlewareLabel = (
    name: string,
    labels: { [key: string]: string }
) => {
    const regex = /traefik\.http.middlewares\.(.+?)\..*/;
    const middlewareNames: string[] = [];
    Object.keys(labels).forEach((middleware) => {
        const matches = regex.exec(middleware);
        if (matches) {
            middlewareNames.push(matches[1]);
        }
    });

    const uniqueMiddlewareNames = [...new Set(middlewareNames)];
    if (uniqueMiddlewareNames.length <= 0) {
        return {};
    }
    return {
        [`traefik.http.routers.${name}.middlewares`]:
            uniqueMiddlewareNames.join(","),
    };
};
const getAllLabels = (service: Service, redirects: Redirect[]) => {
    const internalName = `traefiker_${service.name}`;
    const SSLLabels = getSSLLabels(internalName);
    const hostLabels = transformHostsToLabel(internalName, service.hosts);
    const hostPathPrefixMiddlewareLabels =
        transformHostsToPathPrefixMiddlewareLabels(internalName, service.hosts);
    const redirectMiddlewareLabels = transformRedirectsToMiddlewareLabels(
        internalName,
        redirects
    );
    const labels = {
        ...SSLLabels,
        ...hostLabels,
        ...hostPathPrefixMiddlewareLabels,
        ...redirectMiddlewareLabels,
    };
    const middlewareLabel = getMiddlewareLabel(internalName, labels);
    return { ...labels, ...middlewareLabel };
};
