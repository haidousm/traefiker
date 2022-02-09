import axios from "axios";
import { Service } from "../types/Service";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const ROOT_API_URL =
    publicRuntimeConfig.NEXT_PUBLIC_API_URL ?? "http://localhost:8010";

const getServices = async () => {
    return await (
        await axios.get(`${ROOT_API_URL}/services`)
    ).data;
};

const createService = async (service: Service) => {
    return await axios.post(`${ROOT_API_URL}/services/create`, {
        name: service.name,
        image: service.image.resolvedName,
        hosts: service.hosts,
        redirects: service.redirects,
        order: service.order ?? 0,
    });
};

const updateService = async (service: Service) => {
    return await axios.put(`${ROOT_API_URL}/services/${service.name}`, {
        hosts: service.hosts,
        image: service.image.resolvedName,
        redirects: service.redirects,
    });
};

const deleteService = async (service: Service) => {
    return await axios.delete(
        `${ROOT_API_URL}/services/delete/${service.name}`
    );
};

const updateServiceOrdering = async (services: Service[]) => {
    return await axios.put(`${ROOT_API_URL}/services/order`, {
        services,
    });
};

const startService = async (service: Service) => {
    return await axios.put(`${ROOT_API_URL}/services/start/${service.name}`);
};

const stopService = async (service: Service) => {
    return await axios.put(`${ROOT_API_URL}/services/stop/${service.name}`);
};

export {
    getServices,
    createService,
    updateService,
    deleteService,
    updateServiceOrdering,
    startService,
    stopService,
};
