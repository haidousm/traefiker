import ServiceModel from "../models/Service";

export const findAllServices = async () => {
    return ServiceModel.find({}).populate("images").lean();
};
