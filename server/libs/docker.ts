import Docker, { Container, ContainerInfo } from "dockerode";
import { ServiceStatus } from "../src/types/enums/ServiceStatus";
import { Image } from "../src/types/Image";
import { Redirect } from "../src/types/Redirect";
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

            const labels = getAllLabels(service);
            const environmentVariables: string[] =
                service.environmentVariables.map(
                    (env) => `${env.key}=${env.value}`
                );

            const container = await docker.createContainer({
                Image: imageIdentifier,
                name: `traefiker_${service.name}`,
                Labels: labels,
                HostConfig: {
                    NetworkMode: "traefiker",
                },
                Env: environmentVariables,
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

export const getAllContainers = async (): Promise<ContainerInfo[]> => {
    return docker.listContainers({ all: true });
};

const getSSLLabels = (name: string) => {
    return {
        [`traefik.http.routers.${name}.tls`]: "true",
        [`traefik.http.routers.${name}.tls.certresolver`]: "lets-encrypt",
    };
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
const getAllLabels = (service: Service) => {
    const SSLLabels = getSSLLabels(service.name);
    const hostLabels = transformHostsToLabel(service.name, service.hosts);
    const hostPathPrefixMiddlewareLabels =
        transformHostsToPathPrefixMiddlewareLabels(service.name, service.hosts);
    const redirectMiddlewareLabels = transformRedirectsToMiddlewareLabels(
        service.name,
        service.redirects
    );
    const labels = {
        ...SSLLabels,
        ...hostLabels,
        ...hostPathPrefixMiddlewareLabels,
        ...redirectMiddlewareLabels,
    };
    const middlewareLabel = getMiddlewareLabel(service.name, labels);
    return { ...labels, ...middlewareLabel };
};
