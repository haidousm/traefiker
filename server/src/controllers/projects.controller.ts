import { Request, Response } from "express";
import { findProjectByName } from "../services/projects.service";
import { findServicesByProjectId } from "../services/services.service";
import { Service } from "../types/Service";
import logger from "../utils/logger";

export const getAllServicesForProjectHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const projectName = req.params.projectName;
        const project = await findProjectByName(projectName);
        if (!project) {
            return res.status(404).send("Project not found");
        }
        const services: Service[] = await findServicesByProjectId(project.id);
        return res.json(services);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};
