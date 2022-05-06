import { Request, Response } from "express";
import { ServiceDocument } from "../schemas/services.schema";
import { findAllServices } from "../services/services.service";

export const getAllServicesHandler = async (
    req: Request,
    res: Response<ServiceDocument[]>
) => {
    const services: ServiceDocument[] = await findAllServices();
    res.status(200).json(services);
};
