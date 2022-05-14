import { Request, Response } from "express";
import {
    findAllServices,
    saveService,
    findServiceByName,
    deleteServiceByName,
} from "../services/services.service";
import { Service } from "../types/Service";
import { getOrCreateImageByImageIdentifier } from "../services/images.service";
import { Image } from "../types/Image";
import {
    createContainer,
    deleteContainer,
    startContainer,
    stopContainer,
} from "../../libs/docker";
import { ServiceStatus } from "../types/enums/ServiceStatus";
import Dockerode from "dockerode";
import { findLastUsedOrder } from "../services/services.service";
import logger from "../utils/logger";

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
        const image: Image = await getOrCreateImageByImageIdentifier(
            req.body.image
        );
        const service: Service = await saveService({
            name: req.body.name,
            status: ServiceStatus.PULLING,
            image: image,
            hosts: req.body.hosts,
            environmentVariables: [],
            redirects: [],
            order: (await findLastUsedOrder()) + 1, // TODO: operation is not atomic ?? might(is) a problem if multiple requests are made at the same time
        });
        createContainer(
            service,
            image,
            attachContainerToService,
            cleanUpOnError
        );
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

        const service: Service | null = await findServiceByName(
            req.params.name
        );
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
        await saveService(service);
        createContainer(
            service,
            image,
            attachContainerToService,
            cleanUpOnError
        );
        logger.info(`Service ${service.name} updated`);
        return res.json(service);
    } catch (e) {
        return res.status(500).json({
            error: e,
        });
    }
};

export const startServiceHandler = async (req: Request, res: Response) => {
    try {
        const service: Service | null = await findServiceByName(
            req.params.name
        );
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
        const updatedService = await saveService(service);
        logger.info(`Service ${updatedService.name} started`);
        return res.json(updatedService);
    } catch (e) {
        return res.status(500).json({
            error: e,
        });
    }
};

export const stopServiceHandler = async (req: Request, res: Response) => {
    try {
        const service: Service | null = await findServiceByName(
            req.params.name
        );
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
        const updatedService = await saveService(service);
        logger.info(`Service ${updatedService.name} stopped`);
        return res.json(updatedService);
    } catch (e) {
        return res.status(500).json({
            error: e,
        });
    }
};

export const deleteServiceHandler = async (req: Request, res: Response) => {
    try {
        const service: Service | null = await findServiceByName(
            req.params.name
        );
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
        const service: Service | null = await findServiceByName(
            req.params.name
        );
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
        await saveService(service);
        createContainer(
            service,
            service.image,
            attachContainerToService,
            cleanUpOnError
        );
        logger.info(`Service ${service.name} recreated`);
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

export const updateServicesOrderHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const services: Service[] = [];
        for (const service of req.body.services) {
            const foundService: Service | null = await findServiceByName(
                service.name
            );
            if (!foundService) {
                logger.error(`Service ${service.name} not found`);
                return res.status(404).json({
                    error: `Service with name ${service.name} not found`,
                });
            }
            foundService.order = service.order;
            services.push(foundService);
        }
        // updating the order should be atomic, so we need to save all the services after updating the order
        const updatedServices = await Promise.all(
            services.map(async (service: Service) => {
                return await saveService(service);
            })
        );
        logger.info(`Services order updated`);
        return res.json(updatedServices);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

const attachContainerToService = async (
    service: Service,
    container: Dockerode.Container
) => {
    const containerInfo = await container.inspect();
    service.network = containerInfo.HostConfig.NetworkMode;
    service.containerId = container.id;
    service.status = ServiceStatus.CREATED;
    await saveService(service);
    // istanbul ignore next
    logger.info(
        `Container ${container.id} attached to service ${service.name}`
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cleanUpOnError = async (service: Service, error: any) => {
    service.status = ServiceStatus.ERROR;
    await saveService(service);
    // istanbul ignore next
    logger.error(`Service ${service.name} in error state because of ${error}`);
};
