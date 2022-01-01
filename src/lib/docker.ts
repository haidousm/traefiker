import { exec } from "child_process";
import fs from "fs";
import YAML from "yaml";
import { _Service, Service } from "../types/Service";
import { DockerCompose } from "../types/DockerCompose";
import { UrlRedirect } from "../types/UrlRedirect";

const HOST_LABEL_PREFIX = "traefik.http.routers.{service-name}.rule";
const PATH_MIDDLEWARE_PREFIX =
    "traefik.http.middlewares.{path-name}-prefix.stripprefix.prefixes";
const REDIRECT_MIDDLEWARE_PREFIXES = [
    "traefik.http.middlewares.{redirect-id}-redirectregex.redirectregex.regex",
    "traefik.http.middlewares.{redirect-id}-redirectregex.redirectregex.replacement",
];
const ROUTER_MIDDLEWARE_PREFIX =
    "traefik.http.routers.{service-name}.middlewares";

const SERVICE_ORDER_PREFIX = "traefiker.{service-name}.order";

const HOSTS_DELIMITER = " || ";
const PATH_PREFIX_DELIMITER = " && ";
const MIDDLEWARE_DELIMITER = ",";

export function getAllServices() {
    const dockerCompose = getData(process.env.DOCKER_COMPOSE_FILEPATH!);
    const _services: _Service[] = Object.values(dockerCompose.services);
    return _services.map((_service, index) => {
        const name = Object.keys(dockerCompose.services).find(
            (key: any) => dockerCompose.services[key] === _service
        ) as string;
        const hosts = getFormattedHostsFromService(name, _service);
        const order = getOrderFromService(name, _service);
        console.log(getRedirectsFromService(name, _service));
        return {
            name,
            image: _service.image,
            hosts,
            order: order >= 0 ? order : index,
        } as Service;
    }) as Service[];
}

export function getServiceByName(name: string) {
    return getAllServices().find((service) => service.name === name);
}

export function createService(
    name: string,
    image: string,
    hosts: string[],
    order: number
) {
    const _service: _Service = {
        image,
        labels: [
            `traefik.http.routers.${name}.tls=true`,
            `traefik.http.routers.${name}.tls.certresolver=lets-encrypt`,
            `${SERVICE_ORDER_PREFIX.replace("{service-name}", name)}=${order}`,
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
    const command = `docker-compose pull && docker-compose -f ${process.env
        .DOCKER_COMPOSE_FILEPATH!} up -d --remove-orphans && docker system prune -f`;
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

export function updateServiceOrder(name: string, order: number) {
    const dockerCompose = getData(process.env.DOCKER_COMPOSE_FILEPATH!);
    const service = dockerCompose.services[name as any];
    if (!service) {
        return;
    }
    const labels = service.labels.map((label) => {
        if (
            label.startsWith(
                SERVICE_ORDER_PREFIX.replace("{service-name}", name)
            )
        ) {
            return `${label.split("=")[0]}=${order}`;
        }
        return label;
    });
    service.labels = labels;
    writeData(process.env.DOCKER_COMPOSE_FILEPATH!, dockerCompose);
}

export function getRawData() {
    const yaml = fs.readFileSync(process.env.DOCKER_COMPOSE_FILEPATH!, "utf8");
    return yaml;
}

export function writeRawData(data: string) {
    fs.writeFileSync(process.env.DOCKER_COMPOSE_FILEPATH!, data);
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
            path
        )}=/${path}`;
    });
    const routerMiddlewareLabel = `${ROUTER_MIDDLEWARE_PREFIX.replace(
        "{service-name}",
        name
    )}=${paths.map((path) => `${path}-prefix`).join(PATH_PREFIX_DELIMITER)}`;

    return [...pathMiddlewareLabels, routerMiddlewareLabel];
}

function getOrderFromService(name: string, _service: _Service) {
    const { labels } = _service;
    if (!labels || !labels.length) {
        return -1;
    }

    const possibleOrderLabel = labels.filter((label) =>
        label.startsWith(SERVICE_ORDER_PREFIX.replace("{service-name}", name))
    );
    if (!possibleOrderLabel.length) {
        return -1;
    }
    const orderLabel = possibleOrderLabel[0];
    const order = parseInt(orderLabel.split("=")[1]);
    return order;
}

function getRedirectsFromService(name: string, _service: _Service) {
    const { labels } = _service;
    if (!labels || !labels.length) {
        return -1;
    }

    const possibleMiddlewareLabel = labels.filter((label) =>
        label.startsWith(
            ROUTER_MIDDLEWARE_PREFIX.replace("{service-name}", name)
        )
    );
    if (!possibleMiddlewareLabel.length) {
        return -1;
    }
    const middlewareLabel = possibleMiddlewareLabel[0];
    const redirectMiddlewares = middlewareLabel
        .split("=")[1]
        .split(MIDDLEWARE_DELIMITER)
        .map((redirect) => redirect.trim())
        .filter((redirect) => redirect.includes("redirectregex"));

    let redirects: UrlRedirect[] = [];
    redirectMiddlewares.forEach((redirectMiddleware) => {
        const id = parseInt(redirectMiddleware.split("-")[0]);
        const from = labels
            .find((label) =>
                label.startsWith(
                    REDIRECT_MIDDLEWARE_PREFIXES[0].replace(
                        "{redirect-id}",
                        `${id}`
                    )
                )
            )
            ?.split("=")[1]!;
        const to = labels
            .find((label) =>
                label.startsWith(
                    REDIRECT_MIDDLEWARE_PREFIXES[1].replace(
                        "{redirect-id}",
                        `${id}`
                    )
                )
            )
            ?.split("=")[1]!;
        redirects.push({ id, from, to });
    });

    return redirects;
}
