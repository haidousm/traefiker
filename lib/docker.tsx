import fs from "fs";
import YAML from "yaml";

export interface DockerCompose {
    version: string;
    networks: {
        [name: string]: {
            external: boolean;
        };
    };
    services: _Service[];
}

export interface Service {
    name: string;
    image: string;
    hosts: string[];
}

interface _Service {
    image: string;
    labels: string[];
    networks: string[];
}

const HOST_LABEL_PREFIX = "traefik.http.routers.{service-name}.rule";
const HOSTS_DELIMITER = "||";

export function getData(filepath: string) {
    const yaml = fs.readFileSync(filepath, "utf8");
    return YAML.parse(yaml) as DockerCompose;
}

export function getAllServices(dockerCompose: DockerCompose) {
    const _services: _Service[] = Object.values(dockerCompose.services);
    return _services.map((_service) => {
        const name = Object.keys(dockerCompose.services).find(
            (key: any) => dockerCompose.services[key] === _service
        ) as string;
        const hosts = getFormattedHostsFromService(name, _service);
        return {
            name,
            image: _service.image,
            hosts,
        } as Service;
    }) as Service[];
}

export function getFormattedHostsFromService(name: string, service: _Service) {
    const { labels } = service;
    if (!labels || !labels.length) {
        return [];
    }
    const possibleHostLabel = labels.filter((label) =>
        label.startsWith(HOST_LABEL_PREFIX.replace("{service-name}", name))
    );
    if (!possibleHostLabel.length) {
        return [];
    }
    const hostsLabel = possibleHostLabel[0];
    const hosts = hostsLabel
        .split("=")[1]
        .split(HOSTS_DELIMITER)
        .map((host) => host.trim());
    return hosts.map((host) => transformHostLabelToHost(host));
}

function transformHostLabelToHost(hostLabel: string) {
    const hostnameRegex = /Host\(`([^)]+)`\)/;
    const hostMatch = hostLabel.match(hostnameRegex);
    if (!hostMatch) {
        throw new Error("Invalid host label");
    }
    const hostname = hostMatch[1];

    const pathRegex = /PathPrefix\(`([^)]+)`\)/;
    const pathMatch = hostLabel.match(pathRegex);
    const path = pathMatch ? pathMatch[1] : "";
    return `${hostname}${path}`;
}
