import ServiceModel from "../models/Service";

// istanbul ignore next
export const findAllServices = async () => {
    return ServiceModel.find({}).populate("images").lean();
};
