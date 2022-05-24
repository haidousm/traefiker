import { HydratedDocument } from "mongoose";
import ImageModel from "../models/Image";
import ServiceModel from "../models/Service";
import { Image } from "../types/Image";
import { Service } from "../types/Service";

export const findAllServices = async () => {
    return await ServiceModel.find({})
        .populate<{
            image: Image;
        }>({ path: "image", model: ImageModel })
        .exec();
};

export const findServiceByName = async (name: string) => {
    return await ServiceModel.findOne({ name })
        .populate<{
            image: Image;
        }>({ path: "image", model: ImageModel })
        .exec();
};

export const deleteServiceByName = async (name: string) => {
    const internalService = await ServiceModel.findOne({ name })
        .orFail()
        .exec();
    return await internalService.remove();
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
    const hydratedService: HydratedDocument<Service> =
        service as unknown as HydratedDocument<Service>;
    return await hydratedService.save();
};

// export const findServicesByProjectId = async (
//     id: string
// ): Promise<Service[]> => {
//     const internalServices: Internal_ServiceDocument[] =
//         await ServiceModel.find({
//             project: id,
//         })
//             .populate("image")
//             .populate("project")
//             .exec();
//     return internalServices.map(internalServiceToService);
// };
