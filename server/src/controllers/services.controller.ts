import { Request, Response } from "express";
import { findAllServices } from "../services/services.service";

export const getAllServicesHandler = async (req: Request, res: Response) => {
    const services = await findAllServices();
    res.status(200).json({
        services,
    });
};
