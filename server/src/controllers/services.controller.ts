import { Request, Response } from "express";
import { findAllServices, saveService } from "../services/services.service";
import { Service } from "../types/Service";
import { getOrCreateImageByImageIdentifier } from "../services/images.service";
import { Image } from "../types/Image";
import { createContainer, pullImage } from "../../libs/docker";
import { ServiceStatus } from "../types/enums/ServiceStatus";

export const getAllServicesHandler = async (
    _req: Request,
    res: Response<Service[]>
) => {
    const services: Service[] = await findAllServices();
    return res.json(services);
};

export const createServiceHandler = async (req: Request, res: Response) => {
    // TODO: add check for existing service with same name
    try {
        const image: Image = await getOrCreateImageByImageIdentifier(
            req.body.image
        );
        await pullImage(image);
        const container = await createContainer(
            req.body.name,
            req.body.hosts,
            image
        );
        const containerDetails = await container.inspect();
        const service: Service = await saveService({
            name: req.body.name,
            status: ServiceStatus.CREATED,
            image: image,
            hosts: req.body.hosts,
            environmentVariables: [],
            redirects: [],
            network: "web", // use container details for this LATER
            containerId: container.id,
            internalName: containerDetails.Name,
            order: 0, // fix later
        });
        return res.json(service);
    } catch (e) {
        return res.status(400).json({
            error: e,
        });
    }
};
