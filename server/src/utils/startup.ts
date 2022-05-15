import {
    deleteAllImages,
    getOrCreateImageByImageIdentifier,
} from "../services/images.service";
import {
    deleteAllContainers,
    findLastUsedOrder,
    saveService,
} from "../services/services.service";
import { getAllContainers, inspectContainerById } from "../../libs/docker";
import { ServiceStatus } from "../types/enums/ServiceStatus";
import { Redirect } from "../types/Redirect";
import { EnvironmentVariable } from "../types/EnvironmentVariable";

export const useDockerAsSourceOfTruth = async () => {
    try {
        await deleteAllContainers();
        await deleteAllImages();

        const containers = (await getAllContainers()).filter(
            (container) =>
                container.Names[0].includes("traefiker_") &&
                !container.Names[0].includes("traefiker-client") &&
                !container.Names[0].includes("traefiker-server")
        );
        for (const container of containers) {
            const serviceInternalName = container.Names[0].replace("/", "");

            const image = await getOrCreateImageByImageIdentifier(
                container.Image
            );
            const hosts: string[] = transformLabelsToHosts(
                serviceInternalName,
                container.Labels
            );

            const redirects: Redirect[] = transformLabelsToRedirects(
                serviceInternalName,
                container.Labels
            );

            const inspectData = await inspectContainerById(container.Id);
            const environmentVariables: EnvironmentVariable[] =
                inspectData.Config.Env.map((env) => {
                    const [key, value] = env.split("=");
                    return { key: key, value: value };
                });

            const status =
                container.State.toLowerCase() == "running"
                    ? ServiceStatus.RUNNING
                    : container.State.toLowerCase() == "created"
                    ? ServiceStatus.CREATED
                    : ServiceStatus.STOPPED;
            await saveService({
                name: serviceInternalName.replace("traefiker_", ""),
                status: status, // TODO: use state from container
                image: image,
                hosts: hosts,
                environmentVariables: environmentVariables,
                redirects: redirects,
                order: (await findLastUsedOrder()) + 1, // TODO: operation is not atomic ?? might(is) a problem if multiple requests are made at the same time
                network: inspectData.HostConfig.NetworkMode,
                containerId: container.Id,
                internalName: serviceInternalName,
            });
        }
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

const transformLabelsToHosts = (
    name: string,
    labels: { [key: string]: string }
) => {
    const labelKey = `traefik.http.routers.${name}.rule`;
    if (!labels[labelKey]) {
        return [];
    }
    return labels[labelKey]
        .split("||")
        .map((hostLabel) => hostLabel.trim())
        .map((hostLabel) => {
            const hostRegex =
                /(?:Host\(`(.+)`\) *&& *PathPrefix\(`(.+)`\))|Host\(`(.+)`\)/;
            const hostMatch = hostRegex.exec(hostLabel);
            if (hostMatch) {
                if (hostMatch[1]) {
                    return `${hostMatch[1]}${hostMatch[2]}`;
                } else {
                    return hostMatch[3];
                }
            } else {
                throw new Error("Invalid host label");
            }
        });
};

const transformLabelsToRedirects = (
    name: string,
    labels: { [key: string]: string }
) => {
    const middlewareLabel = `traefik.http.routers.${name}.middlewares`;
    if (!labels[middlewareLabel]) {
        return [];
    }
    const middlewares = labels[middlewareLabel].split(",");

    const redirectMiddlewareLabelNames = middlewares.filter(
        (middlewareLabelName) => {
            const regex = /.-redirect-./;
            return regex.test(middlewareLabelName);
        }
    );

    const redirects: Redirect[] = [];
    for (const redirectMiddlewareLabelName of redirectMiddlewareLabelNames) {
        const fromLabel = `traefik.http.middlewares.${redirectMiddlewareLabelName}.redirectregex.regex`;
        const toLabel = `traefik.http.middlewares.${redirectMiddlewareLabelName}.redirectregex.replacement`;
        if (!labels[fromLabel] || !labels[toLabel]) {
            continue;
        }
        redirects.push({
            from: labels[fromLabel],
            to: labels[toLabel],
        });
    }
    return redirects;
};
