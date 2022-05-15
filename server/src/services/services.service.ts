import ServiceModel, { Internal_ServiceDocument } from "../models/Service";
import { Image } from "../types/Image";
import { Service } from "../types/Service";
import ImageModel, { Internal_ImageDocument } from "../models/Image";
import { Internal_ProjectDocument } from "../models/Project";
import { Project } from "../types/Project";

export const findAllServices = async (): Promise<Service[]> => {
    const internalServices: Internal_ServiceDocument[] =
        await ServiceModel.find().populate("image").populate("project").exec();
    return internalServices.map(internalServiceToService);
};

export const findServiceByName = async (
    name: string
): Promise<Service | null> => {
    const internalService: Internal_ServiceDocument | null =
        await ServiceModel.findOne({ name })
            .populate("image")
            .populate("project")
            .exec();
    if (!internalService) {
        return null;
    }
    return internalServiceToService(internalService);
};

export const findLastUsedOrder = async (): Promise<number> => {
    const internalService = await ServiceModel.findOne({})
        .sort({ order: -1 })
        .exec();
    if (!internalService) {
        return 0;
    }
    return internalService.order;
};

export const saveService = async (service: Service) => {
    const internalService = await ServiceModel.findById(service.id).exec();
    if (!internalService) {
        const internalImage = await ImageModel.findById(
            service.image.id
        ).exec();
        if (!internalImage) {
            throw new Error("Image not found");
        }
        const internalService = new ServiceModel({
            name: service.name,
            status: service.status,
            image: internalImage,
            network: service.network,
            hosts: service.hosts,
            redirects: service.redirects,
            environmentVariables: service.environmentVariables,
            order: service.order,
            internalName: service.internalName,
            containerId: service.containerId,
        });
        await internalService.save();
        return internalServiceToService(internalService);
    }
    internalService.name = service.name;
    internalService.status = service.status;
    internalService.network = service.network;
    internalService.hosts = service.hosts;
    internalService.redirects = service.redirects;
    internalService.environmentVariables = service.environmentVariables;
    internalService.order = service.order;
    internalService.internalName = service.internalName;
    internalService.containerId = service.containerId;
    await internalService.save();
    return internalServiceToService(internalService);
};

export const deleteServiceByName = async (name: string) => {
    const internalService = await ServiceModel.findOne({ name }).exec();
    if (!internalService) {
        throw new Error("Service not found");
    }
    await internalService.remove();
};

export const deleteAllContainers = async () => {
    return ServiceModel.deleteMany({}).exec();
};

const internalServiceToService = (
    internalService: Internal_ServiceDocument
): Service => {
    const internalImage: Internal_ImageDocument =
        internalService.image as unknown as Internal_ImageDocument;
    const image: Image = {
        id: internalImage._id.toString(),
        name: internalImage.name,
        tag: internalImage.tag,
        repository: internalImage.repository,
    };

    const internalProject: Internal_ProjectDocument =
        internalService.project as unknown as Internal_ProjectDocument;
    let project: Project | undefined = undefined;
    if (internalProject) {
        project = {
            id: internalProject._id.toString(),
            name: internalProject.name,
        };
    }
    return {
        id: internalService._id.toString(),
        name: internalService.name,
        status: internalService.status,
        image,
        network: internalService.network,
        hosts: internalService.hosts,
        redirects: internalService.redirects,
        environmentVariables: internalService.environmentVariables,
        order: internalService.order,
        internalName: internalService.internalName,
        project: project,
        containerId: internalService.containerId,
    };
};
