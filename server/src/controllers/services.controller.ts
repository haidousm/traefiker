import { Request, Response } from "express";
import { createContainer } from "../../libs/docker";
import {
    CreateServiceRequest,
    ServiceDocument,
} from "../schemas/services.schema";
import {
    attachContainerToService,
    createService,
    findAllServices,
} from "../services/services.service";
import { findImageByImageIdentifier } from "../services/images.service";

export const getAllServicesHandler = async (
    _req: Request,
    res: Response<ServiceDocument[]>
) => {
    const services: ServiceDocument[] = await findAllServices();
    res.status(200).json(services);
};

export const createServiceHandler = async (
    req: Request<CreateServiceRequest>,
    res: Response<ServiceDocument>
) => {
    const service = await createService(req.body);
    const image = await findImageByImageIdentifier(service.image.toString());
    if (!image) {
        return res.sendStatus(500);
    }
    const container = await createContainer(service, image);
    const updatedService = await attachContainerToService(service, container);
    res.json(updatedService);
};
