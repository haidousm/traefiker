import { inspectContainerById } from "../../libs/docker";
import { findAllServices, saveService } from "../services/services.service";
import { ServiceStatus } from "../types/enums/ServiceStatus";
import logger from "./logger";

export const refreshServicesStatuses = async () => {
    const services = await findAllServices();
    for (const service of services) {
        const containerId = service.containerId ?? undefined;
        if (!containerId) {
            continue;
        }
        try {
            const containerInfo = await inspectContainerById(containerId);

            const containerState = containerInfo.State;
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
            await saveService(service);
        } catch (e) {
            logger.error(`Failed refreshing service ${service.name} status`);
            service.status = ServiceStatus.ERROR;
            await saveService(service);
            continue;
        }
    }
};
