import axios from "axios";
import { Service } from "../types/Service";
import getConfig from "next/config";
import { Project } from "../types/Project";
const { publicRuntimeConfig } = getConfig();

const ROOT_API_URL =
    publicRuntimeConfig.NEXT_PUBLIC_API_URL ?? "http://localhost:8010";

const authorizedAxios = () => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios.create({
        baseURL: ROOT_API_URL,
        headers: {
            Authorization: token,
        },
    });
};

const getServices = async () => {
    return await (
        await authorizedAxios().get(`/services`, {})
    ).data;
};

const createService = async (service: Service) => {
    return (
        await authorizedAxios().post(`/services/create`, {
            name: service.name,
            image:
                service.image.repository != "_"
                    ? `${service.image.repository}/${service.image.name}:${service.image.tag}`
                    : `${service.image.name}:${service.image.tag}`,
            hosts: service.hosts,
            project: service.project?.name,
        })
    ).data;
};

const updateService = async (service: Service) => {
    return await authorizedAxios().put(`/services/${service.name}/update`, {
        hosts: service.hosts,
        redirects: service.redirects,
        environmentVariables: service.environmentVariables,
    });
};

const startService = async (service: Service) => {
    return await authorizedAxios().put(`/services/${service.name}/start`);
};

const stopService = async (service: Service) => {
    return await authorizedAxios().put(`/services/${service.name}/stop`);
};

const deleteService = async (service: Service) => {
    return await authorizedAxios().delete(`/services/${service.name}/delete`);
};

const updateServiceOrdering = async (services: Service[]) => {
    const updateOrderRequest: {
        name: string;
        order: number;
    }[] = services.map((service, index) => {
        return {
            name: service.name,
            order: service.order,
        };
    });
    return await authorizedAxios().put(`/services/order`, {
        services: updateOrderRequest,
    });
};

const login = async (username: string, password: string) => {
    return await axios.post(`${ROOT_API_URL}/auth/login`, {
        username,
        password,
    });
};

export const getProjects = async (): Promise<Project[]> => {
    return (await authorizedAxios().get(`${ROOT_API_URL}/projects`, {})).data;
};

export const getServicesForProject = async (projectName: string) => {
    return (
        await authorizedAxios().get(
            `${ROOT_API_URL}/projects/${projectName}/services`,
            {}
        )
    ).data;
};

export const moveServiceToProject = async (
    projectName: string,
    serviceName: string
) => {
    return await authorizedAxios().put(
        `${ROOT_API_URL}/projects/${projectName}/${serviceName}`
    );
};

export {
    getServices,
    createService,
    updateService,
    deleteService,
    updateServiceOrdering,
    startService,
    stopService,
    login,
};
