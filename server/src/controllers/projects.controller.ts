import { Request, Response } from "express";
import {
    createProject,
    deleteProjectByName,
    findAllProjects,
    findAllServicesByProjectName,
    findProjectByName,
    updateProjectByName,
} from "../services/projects.service";
import { findServiceByName, updateService } from "../services/services.service";
import logger from "../utils/logger";

export const getAllProjectsHandler = async (req: Request, res: Response) => {
    const projects = await findAllProjects();
    return res.json(projects);
};

export const getProjectHandler = async (req: Request, res: Response) => {
    try {
        const project = await findProjectByName(req.params.projectName);
        if (!project) {
            return res.sendStatus(404);
        }
        return res.json(project);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

export const createProjectHandler = async (req: Request, res: Response) => {
    try {
        const projectName = req.params.projectName;
        const project = await createProject({
            name: projectName,
        });
        return res.json(project);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

export const updateProjectHandler = async (req: Request, res: Response) => {
    try {
        const updatedProject = await updateProjectByName(
            req.params.projectName,
            {
                name: req.body.name,
            }
        );
        return res.json(updatedProject);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

export const deleteProjectHandler = async (req: Request, res: Response) => {
    try {
        const projectName = req.params.projectName;
        await deleteProjectByName(projectName);
        return res.sendStatus(200);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

export const getAllServicesForProjectHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const services = (
            await findAllServicesByProjectName(req.params.projectName)
        )?.services;
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

export const addServiceToProjectHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const project = await findProjectByName(req.params.projectName);
        const service = await findServiceByName(req.params.serviceName);
        if (!project) {
            return res.sendStatus(404);
        }
        if (!service) {
            return res.sendStatus(404);
        }
        service.projectId = project.id;
        const updatedService = await updateService(service.name, service);
        return res.json(updatedService);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};
