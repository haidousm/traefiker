import { exec } from "child_process";
import fs from "fs";
import YAML from "yaml";
import { _Service, Service, DockerCompose } from "../types/Service";

const HOST_LABEL_PREFIX = "traefik.http.routers.{service-name}.rule";
const PATH_MIDDLEWARE_PREFIX =
    "traefik.http.middlewares.{path-name}-prefix.stripprefix.prefixes";
const ROUTER_MIDDLEWARE_PREFIX =
    "traefik.http.routers.{service-name}.middlewares";
const HOSTS_DELIMITER = " || ";
const PATH_PREFIX_DELIMITER = " && ";

export function getAllServices() {
    const dockerCompose = getData(process.env.DOCKER_COMPOSE_FILEPATH!);
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

export function getServiceByName(name: string) {
    return getAllServices().find((service) => service.name === name);
}

export function createService(name: string, image: string, hosts: string[]) {
    const _service: _Service = {
        image,
        labels: [
            `traefik.http.routers.${name}.tls=true`,
            `traefik.http.routers.${name}.tls.certresolver=lets-encrypt`,
        ],
        networks: ["web", "internal"],
    };

    const hostsLabel = transformHostsToHostLabel(name, hosts);
    _service.labels.push(hostsLabel);
    if (hostsLabel.includes("PathPrefix")) {
        const pathMiddlewareLabels = getPathMiddlewareLabels(name, hosts);
        _service.labels = [..._service.labels, ...pathMiddlewareLabels];
    }
    return _service;
}

export function saveService(name: string, _service: _Service) {
    const dockerCompose = getData(process.env.DOCKER_COMPOSE_FILEPATH!);
    dockerCompose.services[name as any] = _service;
    writeData(process.env.DOCKER_COMPOSE_FILEPATH!, dockerCompose);
}

export function deleteService(name: string) {
    const dockerCompose = getData(process.env.DOCKER_COMPOSE_FILEPATH!);
    delete dockerCompose.services[name as any];
    writeData(process.env.DOCKER_COMPOSE_FILEPATH!, dockerCompose);
}

export function launchDockerCompose(callback: () => void) {
    const command = `docker-compose -f ${process.env
        .DOCKER_COMPOSE_FILEPATH!} up -d`;
    exec(command, { encoding: "utf8" }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        callback();
    });
}

function getData(filepath: string) {
    const yaml = fs.readFileSync(filepath, "utf8");
    return YAML.parse(yaml) as DockerCompose;
}

function writeData(filepath: string, data: DockerCompose) {
    const yaml = YAML.stringify(data);
    fs.writeFileSync(filepath, yaml);
}

function getFormattedHostsFromService(name: string, service: _Service) {
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

function transformHostsToHostLabel(name: string, hosts: string[]) {
    return `${HOST_LABEL_PREFIX.replace("{service-name}", name)}=${hosts
        .map((host) => {
            const path = host.split("/").slice(1).join("/");
            return `Host(\`${host.split("/")[0]}\`)${
                path ? `${PATH_PREFIX_DELIMITER}PathPrefix(\`/${path}\`)` : ""
            }`;
        })
        .join(HOSTS_DELIMITER)}`;
}

function getPathMiddlewareLabels(name: string, hosts: string[]) {
    const paths = hosts
        .map((host) => {
            const path = host.split("/").slice(1).join("/");
            return path;
        })
        .filter((path) => path !== "");

    const pathMiddlewareLabels = paths.map((path) => {
        return `${PATH_MIDDLEWARE_PREFIX.replace(
            "{path-name}",
            name
        )}=/${path}`;
    });
    const routerMiddlewareLabel = `${ROUTER_MIDDLEWARE_PREFIX.replace(
        "{service-name}",
        name
    )}=${paths.map((path) => `${path}-prefix`).join(PATH_PREFIX_DELIMITER)}`;

    return [...pathMiddlewareLabels, routerMiddlewareLabel];
}
