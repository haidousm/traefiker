import { Request, Response } from "express";
import {
    CreateServiceRequest,
    ServiceDocument,
} from "../schemas/services.schema";
import {
    createImageByImageIdentifier,
    findImageByImageIdentifier,
} from "../services/images.service";
import { findAllServices } from "../services/services.service";

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
    const createNewServiceRequest: CreateServiceRequest = req.body;
    const image = await getOrCreateImage(createNewServiceRequest.image);
};

const getOrCreateImage = async (imageIdentifier: string) => {
    // const { repository, imageName, tag } =
    //     parseImageIdentifier(imageIdentifier);
    let image = await findImageByImageIdentifier(imageIdentifier);
    if (!image) {
        image = await createImageByImageIdentifier(imageIdentifier);
    }
    return image;
};

// router.post("/create", async (req, res) => {
//     const serviceRequest = req.body;
//     const resolvedName = serviceRequest.image;

//     const image = await getOrCreateImage(resolvedName);
//     if (image === -1) {
//         return res.status(400).json({
//             message: "Invalid image name",
//         });
//     }

//     const service = await createService(serviceRequest, image);
//     await createContainer(service, image);
//     res.json(service);
// });
