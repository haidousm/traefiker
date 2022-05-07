import Dockerode from "dockerode";
import ServiceModel from "../models/Service";
import {
    CreateServiceRequest,
    ServiceDocument,
} from "../schemas/services.schema";
import { getOrCreateImageByImageIdentifier } from "./images.service";

// istanbul ignore next
export const findAllServices = async () => {
    return ServiceModel.find({}).populate("images").lean();
};

export const createService = async (
    createNewServiceRequest: CreateServiceRequest
) => {
    const image = await getOrCreateImageByImageIdentifier(
        createNewServiceRequest.image
    );

    const latestServiceByOrder = await ServiceModel.findOne(
        {},
        { sort: { order: -1 } }
    );

    let order = 0;
    if (latestServiceByOrder) {
        order = latestServiceByOrder.order + 1;
    }

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
    return service.save();
};

export const attachContainerToService = (
    service: ServiceDocument,
    container: Dockerode.Container
) => {
    service.containerId = container.id;
    service.status = "running";
    return service.save();
};
