import { ServiceStatus } from "@prisma/client";
import { inspectContainerById } from "../../libs/docker";
import { findContainerInfoById } from "../services/containerInfo.service";
import { findAllServices, updateService } from "../services/services.service";
import logger from "./logger";

export const refreshServicesStatuses = async () => {
    const services = await findAllServices();
    for (const service of services) {
        const containerInfoId = service.containerInfoId ?? undefined;
        if (!containerInfoId) {
            continue;
        }
        const containerInfo = await findContainerInfoById(containerInfoId);
        if (!containerInfo) {
            continue;
        }
        try {
            const dockerInfo = await inspectContainerById(
                containerInfo.containerId
            );

            const containerState = dockerInfo.State;
            if (containerState.Running) {
                service.status = ServiceStatus.RUNNING;
            } else if (containerState.Paused) {
                service.status = ServiceStatus.STOPPED;
            } else if (containerState.Restarting) {
                service.status = ServiceStatus.CREATED;
            } else if (containerState.Dead || containerState.Error) {
                service.status = ServiceStatus.ERROR;
            } else {
                service.status = ServiceStatus.CREATED;
            }
            await updateService(service.name, service);
        } catch (e) {
            logger.error(`Failed refreshing service ${service.name} status`);
            service.status = ServiceStatus.ERROR;
            await updateService(service.name, service);
            continue;
        }
    }
};
