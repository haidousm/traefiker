import { Request, Response } from "express";
import { createContainer } from "../../libs/docker";
import {
    CreateServiceRequest,
    ServiceResponse,
} from "../schemas/services.schema";
import {
    attachContainerToService,
    createService,
    findAllServices,
} from "../services/services.service";
import { ServiceDocument } from "../models/Service";
import { ImageDocument } from "../models/Image";

export const getAllServicesHandler = async (
    _req: Request,
    res: Response<ServiceResponse[]>
) => {
    const services = await findAllServices();
    res.status(200).json(
        services.map((serviceDocument) =>
            createServiceResponseFromServiceDocument(serviceDocument)
        )
    );
};

export const createServiceHandler = async (
    req: Request,
    res: Response<ServiceResponse>
) => {
    const service = await createService(req.body);
    const container = await createContainer(service);
    const updatedService = await attachContainerToService(service, container);
    return res.json(createServiceResponseFromServiceDocument(updatedService));
};

const createImageResponseFromImageDocument = (image: ImageDocument) => {
    return {
        name: image.name,
        tag: image.tag,
        repository: image.repository,
        identifier: image.identifier,
        createdAt: image.createdAt,
    };
};

const createServiceResponseFromServiceDocument = (service: ServiceDocument) => {
    const imageResponse = createImageResponseFromImageDocument(
        service.image as unknown as ImageDocument
    );
    return {
        name: service.name,
        status: service.status,
        image: imageResponse,
        network: service.network,
        hosts: service.hosts,
        redirects: service.redirects,
        environments: service.environments,
        order: service.order,
        createdAt: service.createdAt,
        containerId: service.containerId,
        tag: service.tag,
    };
};
