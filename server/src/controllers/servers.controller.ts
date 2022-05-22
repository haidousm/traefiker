import { Server } from "../types/Server";
import { Request, Response } from "express";
import {
    createServer,
    deleteServerByName,
    findAllServers,
    findServerByName,
    saveServer,
} from "../services/servers.service";
import logger from "../utils/logger";
import {
    findServiceByName,
    findServicesByServerId,
    saveService,
} from "../services/services.service";
import { Service } from "../types/Service";

export const getAllServersHandler = async (req: Request, res: Response) => {
    const servers: Server[] = await findAllServers();
    return res.json(servers);
};

export const getServerHandler = async (req: Request, res: Response) => {
    const server: Server | null = await findServerByName(req.params.serverName);
    if (!server) {
        return res.sendStatus(404);
    }
    return res.json(server);
};

export const createServerHandler = async (req: Request, res: Response) => {
    try {
        const serverName = req.params.serverName;
        const server = await createServer(serverName);
        return res.json(server);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

export const updateServerHandler = async (req: Request, res: Response) => {
    try {
        const serverName = req.params.serverName;
        const server = await findServerByName(serverName);
        if (!server) {
            return res.sendStatus(404);
        }
        server.name = req.body.name;
        return res.json(await saveServer(server));
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};

export const deleteServerHandler = async (req: Request, res: Response) => {
    try {
        const serverName = req.params.serverName;
        await deleteServerByName(serverName);
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

export const getAllServicesForServerHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const serverName = req.params.serverName;
        const server = await findServerByName(serverName);
        if (!server) {
            return res.status(404).send("Server not found");
        }
        const services: Service[] = await findServicesByServerId(server.id);
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

export const addServiceToServerHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const serverName = req.params.serverName;
        const serviceName = req.params.serviceName;

        const server = await findServerByName(serverName);
        if (!server) {
            return res.status(404).send("Server not found");
        }

        const service = await findServiceByName(serviceName);
        if (!service) {
            return res.status(404).send("Service not found");
        }
        service.server = server;
        return res.json(await saveService(service));
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};
