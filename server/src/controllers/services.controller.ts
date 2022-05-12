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
            network: "web", // use container details for this LATER
            order: 0, // fix later
        });
        createContainer(service, image, attachContainerToService);
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
    service.containerId = container.id;
    service.status = ServiceStatus.CREATED;
    await saveService(service);
};
