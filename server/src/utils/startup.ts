import { findImageById } from "../services/images.service";
import {
    createContainer,
    deleteContainerByContainerId,
    getAllContainers,
} from "../../libs/docker";
import {
    attachContainerToService,
    cleanUpOnError,
} from "../controllers/services.controller";
import logger from "./logger";
import { findAllServices, updateService } from "../services/services.service";
import { ServiceStatus } from "@prisma/client";

export const useDockerAsSourceOfTruth = async () => {
    /* commented out since unlikely to be used anymore, will reimpl later */
    throw new Error("Unimplemented");
    // try {
    //     await deleteAllServices();
    //     await deleteAllImages();

    //     const containers = (await getAllContainers()).filter(
    //         (container) =>
    //             container.Names[0].includes("traefiker_") &&
    //             !container.Names[0].includes("traefiker-client") &&
    //             !container.Names[0].includes("traefiker-server")
    //     );
    //     for (const container of containers) {
    //         const serviceInternalName = container.Names[0].replace("/", "");
    //         const image = await getOrCreateImageByImageIdentifier(
    //             container.Image
    //         );
    //         const hosts: string[] = transformLabelsToHosts(
    //             serviceInternalName,
    //             container.Labels
    //         );
    //         const redirects: Redirect[] = transformLabelsToRedirects(
    //             serviceInternalName,
    //             container.Labels
    //         );

    //         const inspectData = await inspectContainerById(container.Id);
    //         // const environmentVariables: EnvironmentVariable[] =
    //         //     inspectData.Config.Env.map((env) => {
    //         //         const [key, value] = env.split("=");
    //         //         await createEnvironmentVariable({
    //         //             ...envVar,
    //         //             service: {
    //         //                 connect: {
    //         //                     id: service.id,
    //         //                 },
    //         //             },
    //         //         });
    //         //         return { key: key, value: value };
    //         //     });

    //         const defaultProject = await findProjectByName("default");
    //         const defaultUser = await findUser({
    //             username: "ha"
    //         })
    //         if (!defaultProject) {
    //             throw Error("default project not found?");
    //         }
    //         const status =
    //             container.State.toLowerCase() == "running"
    //                 ? ServiceStatus.RUNNING
    //                 : container.State.toLowerCase() == "created"
    //                 ? ServiceStatus.CREATED
    //                 : ServiceStatus.STOPPED;
    //         await createService({
    //             name: serviceInternalName.replace("traefiker_", ""),
    //             status: status, // TODO: use state from container
    //             hosts: hosts,
    //             image: { connect: image },
    //             project: { connect: defaultProject },
    //             user: { connect: adminUser },
    //         });
    //     }
    // } catch (e) {
    //     console.log(e);
    //     process.exit(1);
    // }
};

export const useDBAsSourceOfTruth = async () => {
    const containers = (await getAllContainers()).filter(
        (container) =>
            container.Names[0].includes("traefiker_") &&
            !container.Names[0].includes("traefiker-client") &&
            !container.Names[0].includes("traefiker-server")
    );
    for (const container of containers) {
        await deleteContainerByContainerId(container.Id);
    }
    const services = await findAllServices();
    for (const service of services) {
        service.status = ServiceStatus.PULLING;
        await updateService(service.name, service);
        const image = await findImageById(service.imageId);
        if (!image) {
            throw new Error("Image not found");
        }
        logger.info(`Creating container for service ${service.name}`);
        createContainer(
            service,
            image,
            attachContainerToService,
            cleanUpOnError
        );
    }
};

// const transformLabelsToHosts = (
//     name: string,
//     labels: { [key: string]: string }
// ) => {
//     const labelKey = `traefik.http.routers.${name}.rule`;
//     if (!labels[labelKey]) {
//         return [];
//     }
//     return labels[labelKey]
//         .split("||")
//         .map((hostLabel) => hostLabel.trim())
//         .map((hostLabel) => {
//             const hostRegex =
//                 /(?:Host\(`(.+)`\) *&& *PathPrefix\(`(.+)`\))|Host\(`(.+)`\)/;
//             const hostMatch = hostRegex.exec(hostLabel);
//             if (hostMatch) {
//                 if (hostMatch[1]) {
//                     return `${hostMatch[1]}${hostMatch[2]}`;
//                 } else {
//                     return hostMatch[3];
//                 }
//             } else {
//                 throw new Error("Invalid host label");
//             }
//         });
// };

// const transformLabelsToRedirects = (
//     name: string,
//     labels: { [key: string]: string }
// ) => {
//     const middlewareLabel = `traefik.http.routers.${name}.middlewares`;
//     if (!labels[middlewareLabel]) {
//         return [];
//     }
//     const middlewares = labels[middlewareLabel].split(",");

//     const redirectMiddlewareLabelNames = middlewares.filter(
//         (middlewareLabelName) => {
//             const regex = /.-redirect-./;
//             return regex.test(middlewareLabelName);
//         }
//     );

//     const redirects: Redirect[] = [];
//     for (const redirectMiddlewareLabelName of redirectMiddlewareLabelNames) {
//         const fromLabel = `traefik.http.middlewares.${redirectMiddlewareLabelName}.redirectregex.regex`;
//         const toLabel = `traefik.http.middlewares.${redirectMiddlewareLabelName}.redirectregex.replacement`;
//         if (!labels[fromLabel] || !labels[toLabel]) {
//             continue;
//         }
//         redirects.push({
//             from: labels[fromLabel],
//             to: labels[toLabel],
//         });
//     }
//     return redirects;
// };
