import { Request, Response } from "express";
import {
    findAllServices,
    saveService,
    findServiceByName,
} from "../services/services.service";
import { Service } from "../types/Service";
import { getOrCreateImageByImageIdentifier } from "../services/images.service";
import { Image } from "../types/Image";
import { createContainer } from "../../libs/docker";
import { ServiceStatus } from "../types/enums/ServiceStatus";
import Dockerode from "dockerode";
import { findLastUsedOrder } from "../services/services.service";

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
        return res.json(service);
    } catch (e) {
        return res.status(400).json({
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
};

const cleanUpOnError = async (service: Service) => {
    service.status = ServiceStatus.ERROR;
    await saveService(service);
};
