import Dockerode from "dockerode";
import ServiceModel, { ServiceDocument } from "../models/Service";
import { CreateServiceRequest } from "../schemas/services.schema";
import { getOrCreateImageByImageIdentifier } from "./images.service";

export const findAllServices = async () => {
    return ServiceModel.find({}).populate("image").exec();
};

export const createService = async (
    createNewServiceRequest: CreateServiceRequest
) => {
    const image = await getOrCreateImageByImageIdentifier(
        createNewServiceRequest.image
    );

    const latestServiceByOrder: ServiceDocument | null =
        await ServiceModel.findOne({}).sort({ order: -1 }).exec();

    const order = latestServiceByOrder ? latestServiceByOrder.order + 1 : 0;

    const service = new ServiceModel({
        name: `traefiker_${createNewServiceRequest.name}`,
        status: "pulling",
        image: image._id,
        hosts: createNewServiceRequest.hosts,
        redirects: [],
        environments: [],
        order: order,
        tag: createNewServiceRequest.name,
    });
    return (await service.populate("image")).save();
};

export const attachContainerToService = (
    service: ServiceDocument,
    container: Dockerode.Container
) => {
    service.containerId = container.id;
    service.status = "created";
    return service.save();
};
