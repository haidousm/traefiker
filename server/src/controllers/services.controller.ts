import { Request, Response } from "express";
import { findAllServices } from "../services/services.service";
import { Service } from "../types/Service";

export const getAllServicesHandler = async (
    _req: Request,
    res: Response<Service[]>
) => {
    const services: Service[] = await findAllServices();
    return res.json(services);
};

export const createServiceHandler = async (req: Request, res: Response) => {};
