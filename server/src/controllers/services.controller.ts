import { Request, Response } from "express";
import {
    findAllServices,
    findServiceByName,
    deleteServiceByName,
    createService,
    updateService,
    PopulatedService,
} from "../services/services.service";
import { getOrCreateImageByImageIdentifier } from "../services/images.service";
import {
    createContainer,
    deleteContainer,
    startContainer,
    stopContainer,
} from "../../libs/docker";
import Dockerode from "dockerode";
import logger from "../utils/logger";
import { bindTrailingArgs } from "../utils/misc";
import { Project } from "../types/Project";
import { findProjectByName } from "../services/projects.service";
import {
    Service,
    Image,
    ServiceStatus,
    EnvironmentVariable,
    Redirect,
    ContainerInfo,
} from "@prisma/client";

export const getAllServicesHandler = async (
    _req: Request,
    res: Response<Service[]>
) => {
    const services: Service[] = await findAllServices();
    return res.json(services);
};

export const createServiceHandler = async (req: Request, res: Response) => {
    try {
        if (await findServiceByName(req.body.name)) {
            logger.error(`Service with name ${req.body.name} already exists`);
            return res.status(400).json({
                error: `Service with name ${req.body.name} already exists`,
            });
        }
        const image = await getOrCreateImageByImageIdentifier(req.body.image);
        const service = await createService({
            name: req.body.name,
            status: ServiceStatus.PULLING,
            image: { connect: image },
            hosts: req.body.hosts,
            user: { connect: req.body.user },
        });

        createContainer(service, image, attachWithRestart, cleanUpOnError);
        logger.info(`Service ${service.name} created`);
        return res.json(service);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

export const updateServiceHandler = async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        const hosts = req.body.hosts;
        const environmentVariables = req.body.environmentVariables;
        const redirects = req.body.redirects;
        if (!hosts && !environmentVariables && !redirects) {
            logger.error(`No changes to service ${name} requested`);
            return res.status(400).json({
                error: "Empty update request",
            });
        }

        const service = await findServiceByName(req.params.name);
        if (!service) {
            logger.error(`Service ${req.params.name} not found`);
            return res.status(404).json({
                error: `Service with name ${name} not found`,
            });
        }
        if (service.status == ServiceStatus.PULLING) {
            logger.error(`Service ${req.params.name} is being pulled`);
            return res.status(400).json({
                error: `Service with name ${name} is still pulling`,
            });
        }

        service.hosts = hosts ?? service.hosts;
        service.environmentVariables =
            environmentVariables ?? service.environmentVariables;
        service.redirects = redirects ?? service.redirects;
        const image = service.image;
        await deleteContainer(service);
        const updatedService = await updateService(service.name, service);
        createContainer(
            updatedService,
            image,
            attachWithRestart,
            cleanUpOnError
        );
        logger.info(`Service ${service.name} updated`);
        return res.json(service);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

export const startServiceHandler = async (req: Request, res: Response) => {
    try {
        const service = await findServiceByName(req.params.name);
        if (!service) {
            logger.error(`Service ${req.params.name} not found`);
            return res.status(404).json({
                error: `Service with name ${req.params.name} not found`,
            });
        }
        if (service.status == ServiceStatus.PULLING) {
            logger.error(`Service ${req.params.name} is being pulled`);
            return res.status(400).json({
                error: `Service with name ${req.params.name} is still pulling`,
            });
        }

        if (service.status == ServiceStatus.RUNNING) {
            logger.error(`Service ${req.params.name} is already running`);
            return res.status(400).json({
                error: `Service with name ${req.params.name} is already running`,
            });
        }
        if (service.status == ServiceStatus.ERROR) {
            logger.error(`Service ${req.params.name} is in error state`);
            return res.status(400).json({
                error: `Service with name ${req.params.name} is in error state`,
            });
        }
        await startContainer(service);
        service.status = ServiceStatus.RUNNING;
        const updatedService = await updateService(service.name, service);
        logger.info(`Service ${updatedService.name} started`);
        return res.json(updatedService);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

export const stopServiceHandler = async (req: Request, res: Response) => {
    try {
        const service = await findServiceByName(req.params.name);
        if (!service) {
            logger.error(`Service ${req.params.name} not found`);
            return res.status(404).json({
                error: `Service with name ${req.params.name} not found`,
            });
        }
        if (service.status == ServiceStatus.PULLING) {
            logger.error(`Service ${req.params.name} is being pulled`);
            return res.status(400).json({
                error: `Service with name ${req.params.name} is still pulling`,
            });
        }

        if (
            service.status == ServiceStatus.STOPPED ||
            service.status == ServiceStatus.CREATED
        ) {
            logger.error(`Service ${req.params.name} is already stopped`);
            return res.status(400).json({
                error: `Service with name ${req.params.name} is already stopped`,
            });
        }
        if (service.status == ServiceStatus.ERROR) {
            logger.error(`Service ${req.params.name} is in error state`);
            return res.status(400).json({
                error: `Service with name ${req.params.name} is in error state`,
            });
        }
        await stopContainer(service);
        service.status = ServiceStatus.STOPPED;
        const updatedService = await updateService(service.name, service);
        logger.info(`Service ${updatedService.name} stopped`);
        return res.json(updatedService);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

export const deleteServiceHandler = async (req: Request, res: Response) => {
    try {
        const service = await findServiceByName(req.params.name);
        if (!service) {
            logger.error(`Service ${req.params.name} not found`);
            return res.status(404).json({
                error: `Service with name ${req.params.name} not found`,
            });
        }
        if (service.status == ServiceStatus.PULLING) {
            logger.error(`Service ${req.params.name} is being pulled`);
            return res.status(400).json({
                error: `Service with name ${req.params.name} is still pulling`,
            });
        }

        if (service.status != ServiceStatus.ERROR) {
            await deleteContainer(service);
        }
        await deleteServiceByName(service.name);
        logger.info(`Service ${service.name} deleted`);
        return res.sendStatus(200);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

// since this is similar to the create service handler
// istanbul ignore next
export const recreateServiceHandler = async (req: Request, res: Response) => {
    try {
        const service = await findServiceByName(req.params.name);
        if (!service) {
            logger.error(`Service ${req.params.name} not found`);
            return res.status(404).json({
                error: `Service with name ${req.params.name} not found`,
            });
        }
        if (service.status == ServiceStatus.PULLING) {
            logger.error(`Service ${req.params.name} is being pulled`);
            return res.status(400).json({
                error: `Service with name ${req.params.name} is still pulling`,
            });
        }
        await deleteContainer(service);

        const image = req.body.image
            ? await getOrCreateImageByImageIdentifier(req.body.image)
            : service.image;
        service.image = image;
        await updateService(service.name, service);
        createContainer(
            service,
            service.image,
            attachWithRestart,
            cleanUpOnError
        );
        logger.info(`Service ${service.name} recreated`);
        return res.json(service);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

// export const updateServicesOrderHandler = async (
//     req: Request,
//     res: Response
// ) => {
//     try {
//         const services: Service[] = [];
//         for (const service of req.body.services) {
//             const foundService: Service | null = await findServiceByName(
//                 service.name
//             );
//             if (!foundService) {
//                 logger.error(`Service ${service.name} not found`);
//                 return res.status(404).json({
//                     error: `Service with name ${service.name} not found`,
//                 });
//             }
//             foundService.order = service.order;
//             services.push(foundService);
//         }
//         // updating the order should be atomic, so we need to save all the services after updating the order
//         const updatedServices = await Promise.all(
//             services.map(async (service: Service) => {
//                 return await updateService(service);
//             })
//         );
//         logger.info(`Services order updated`);
//         return res.json(updatedServices);
//     } catch (e) {
//         if (e instanceof Error) {
//             logger.error(e.message);
//         }
//         return res.status(500).json({
//             error: e,
//         });
//     }
// };

export const attachContainerToService = async (
    service: PopulatedService,
    container: Dockerode.Container,
    start = false
) => {
    const dockerContainerInfo = await container.inspect();
    const containerInfo = {
        network: dockerContainerInfo.HostConfig.NetworkMode!,
        name: `traefiker_${service.name}`,
        containerId: container.id,
    };

    // TODO: create env vars
    // service.environmentVariables = dockerContainerInfo.Config.Env.map(
    //     (envString) => {
    //         // TODO: split on first equal BUT NOT ALWAYS CORRECT
    //         const i = envString.indexOf("=");
    //         const [key, value] = [
    //             envString.slice(0, i),
    //             envString.slice(i + 1),
    //         ];
    //         return {
    //             key,
    //             value,
    //         };
    //     }
    // );
    service.status = ServiceStatus.CREATED;
    logger.info(
        `Container ${container.id} attached to service ${service.name}`
    );
    // istanbul ignore next
    if (start) {
        await startContainer(service);
        service.status = ServiceStatus.RUNNING;
    }
    await updateService(service.name, service);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanUpOnError = async (service: PopulatedService, error: any) => {
    service.status = ServiceStatus.ERROR;
    await updateService(service.name, service);
    // istanbul ignore next
    logger.error(`Service ${service.name} in error state because of ${error}`);
};

const attachWithRestart = bindTrailingArgs(attachContainerToService, true);
