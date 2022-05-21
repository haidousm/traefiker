import axios, { AxiosResponse } from "axios";
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

export const login = async (username: string, password: string) => {
    return axios.post(`${ROOT_API_URL}/auth/login`, {
        username,
        password,
    });
};

export const getServices = async (): Promise<AxiosResponse<Service[]>> => {
    return authorizedAxios().get(`/services`, {});
};

export const createService = async (
    service: Service
): Promise<AxiosResponse<Service>> => {
    return authorizedAxios().post(`/services/create`, {
        name: service.name,
        image:
            service.image.repository != "_"
                ? `${service.image.repository}/${service.image.name}:${service.image.tag}`
                : `${service.image.name}:${service.image.tag}`,
        hosts: service.hosts,
        project: service.project?.name,
    });
};

export const updateService = async (
    service: Service
): Promise<AxiosResponse<Service>> => {
    return authorizedAxios().put(`/services/${service.name}/update`, {
        hosts: service.hosts,
        redirects: service.redirects,
        environmentVariables: service.environmentVariables,
    });
};

export const startService = async (
    service: Service
): Promise<AxiosResponse<Service>> => {
    return authorizedAxios().put(`/services/${service.name}/start`);
};

export const stopService = async (
    service: Service
): Promise<AxiosResponse<Service>> => {
    return authorizedAxios().put(`/services/${service.name}/stop`);
};

export const deleteService = async (
    service: Service
): Promise<AxiosResponse<Service>> => {
    return await authorizedAxios().delete(`/services/${service.name}/delete`);
};

export const updateServiceOrdering = async (
    services: Service[]
): Promise<AxiosResponse<Service[]>> => {
    const updateOrderRequest: {
        name: string;
        order: number;
    }[] = services.map((service, index) => {
        return {
            name: service.name,
            order: service.order,
        };
    });
    return authorizedAxios().put(`/services/order`, {
        services: updateOrderRequest,
    });
};

export const getProjects = async (): Promise<AxiosResponse<Project[]>> => {
    return authorizedAxios().get(`${ROOT_API_URL}/projects`, {});
};

export const getProjectByName = async (
    name: string
): Promise<AxiosResponse<Project>> => {
    return authorizedAxios().get(`${ROOT_API_URL}/projects/${name}`);
};

export const createProject = async (
    name: string
): Promise<AxiosResponse<Project>> => {
    return authorizedAxios().post(`${ROOT_API_URL}/projects/${name}`);
};

export const deleteProjectByName = async (name: string) => {
    return authorizedAxios().delete(`${ROOT_API_URL}/projects/${name}`);
};

export const updateProjectName = async (oldName: string, newName: string) => {
    return authorizedAxios().put(`${ROOT_API_URL}/projects/${oldName}`, {
        name: newName,
    });
};

export const getServicesForProject = async (
    project: Project
): Promise<AxiosResponse<Service[]>> => {
    return authorizedAxios().get(
        `${ROOT_API_URL}/projects/${project.name}/services`,
        {}
    );
};

export const addServiceToProject = async (
    projectName: string,
    serviceName: string
) => {
    return authorizedAxios().put(
        `${ROOT_API_URL}/projects/${projectName}/services/${serviceName}`
    );
};
