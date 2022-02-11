import axios from "axios";
import { Service } from "../types/Service";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const authorizedAxios = () => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios.create({
        baseURL:
            publicRuntimeConfig.NEXT_PUBLIC_API_URL ?? "http://localhost:8010",
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
    return await authorizedAxios().post(`/services/create`, {
        name: service.name,
        image: service.image.resolvedName,
        hosts: service.hosts,
        redirects: service.redirects,
        order: service.order ?? 0,
    });
};

const updateService = async (service: Service) => {
    return await authorizedAxios().put(`/services/${service.name}`, {
        hosts: service.hosts,
        image: service.image.resolvedName,
        redirects: service.redirects,
        environments: service.environments,
        tag: service.tag,
    });
};

const deleteService = async (service: Service) => {
    return await authorizedAxios().delete(`/services/delete/${service.name}`);
};

const updateServiceOrdering = async (services: Service[]) => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return await authorizedAxios().put(
        `/services/order`,
        {
            services,
        },
        {
            headers: {
                Authorization: token,
            },
        }
    );
};

const startService = async (service: Service) => {
    return await authorizedAxios().put(`/services/start/${service.name}`);
};

const stopService = async (service: Service) => {
    return await authorizedAxios().put(`/services/stop/${service.name}`);
};

const login = async (username: string, password: string) => {
    return await axios.post(
        `${
            publicRuntimeConfig.NEXT_PUBLIC_API_URL ?? "http://localhost:8010"
        }/auth/login`,
        {
            username,
            password,
        }
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
