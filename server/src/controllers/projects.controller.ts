import { Request, Response } from "express";
import {
    findAllProjects,
    findProjectByName,
    saveProject,
} from "../services/projects.service";
import { Project } from "../types/Project";

export const getAllProjectsHandler = async (req: Request, res: Response) => {
    const projects: Project[] = await findAllProjects();
    return res.json(projects);
};

export const getProjectHandler = async (req: Request, res: Response) => {
    const project: Project | null = await findProjectByName(
        req.params.projectName
    );
    if (!project) {
        return res.sendStatus(404);
    }
    return res.json(project);
};

// export const createProjectHandler = async (req: Request, res: Response) => {
//     try {
//         const projectName = req.params.projectName;
//         const project = await createProject(projectName);
//         return res.json(project);
//     } catch (e) {
//         if (e instanceof Error) {
//             logger.error(e.message);
//         }
//         return res.status(500).json({
//             error: e,
//         });
//     }
// };

// export const updateProjectHandler = async (req: Request, res: Response) => {
//     try {
//         const projectName = req.params.projectName;
//         const project = await findProjectByName(projectName);
//         if (!project) {
//             return res.sendStatus(404);
//         }
//         project.name = req.body.name;
//         return res.json(await saveProject(project));
//     } catch (e) {
//         if (e instanceof Error) {
//             logger.error(e.message);
//         }
//         return res.status(500).json({
//             error: e,
//         });
//     }
// };

// export const deleteProjectHandler = async (req: Request, res: Response) => {
//     try {
//         const projectName = req.params.projectName;
//         await deleteProjectByName(projectName);
//         return res.sendStatus(200);
//     } catch (e) {
//         if (e instanceof Error) {
//             logger.error(e.message);
//         }
//         return res.status(500).json({
//             error: e,
//         });
//     }
// };

// export const getAllServicesForProjectHandler = async (
//     req: Request,
//     res: Response
// ) => {
//     try {
//         const projectName = req.params.projectName;
//         const project = await findProjectByName(projectName);
//         if (!project) {
//             return res.status(404).send("Project not found");
//         }
//         const services: Service[] = await findServicesByProjectId(project.id);
//         return res.json(services);
//     } catch (e) {
//         if (e instanceof Error) {
//             logger.error(e.message);
//         }
//         return res.status(500).json({
//             error: e,
//         });
//     }
// };

// export const addServiceToProjectHandler = async (
//     req: Request,
//     res: Response
// ) => {
//     try {
//         const projectName = req.params.projectName;
//         const serviceName = req.params.serviceName;

//         const project = await findProjectByName(projectName);
//         if (!project) {
//             return res.status(404).send("Project not found");
//         }

//         const service = await findServiceByName(serviceName);
//         if (!service) {
//             return res.status(404).send("Service not found");
//         }
//         service.project = project;
//         return res.json(await saveService(service));
//     } catch (e) {
//         if (e instanceof Error) {
//             logger.error(e.message);
//         }
//         return res.status(500).json({
//             error: e,
//         });
//     }
// };
