import passport from "passport";
import Dockerode from "dockerode";

import * as ServicesService from "../../services/services.service";
import * as ImageServices from "../../services/images.service";
import * as ProjectServices from "../../services/projects.service";

import * as DockerLib from "../../../libs/docker";

import { Image, Project, Service, User } from "@prisma/client";
import { NextFunction } from "express";

export const authMock = (user?: User) => {
    jest.spyOn(passport, "authenticate").mockImplementationOnce(() => {
        return (req: Request, res: Response, next: NextFunction) => {
            // @ts-ignore
            req.user = user;
            next();
        };
    });
};

export const findAllServicesMock = (services: Service[]) => {
    jest.spyOn(ServicesService, "findAllServices").mockResolvedValueOnce(
        services
    );
};

export const findServiceByNameMock = (service: Service | null) => {
    jest.spyOn(ServicesService, "findServiceByName").mockResolvedValueOnce(
        service
    );
};

export const createServiceMock = (service: Service) => {
    jest.spyOn(ServicesService, "createService").mockResolvedValueOnce(service);
};

export const updateServiceMock = (service: Service) => {
    jest.spyOn(ServicesService, "updateService").mockResolvedValueOnce(service);
};

export const deleteServiceByNameMock = (service: Service) => {
    jest.spyOn(ServicesService, "deleteServiceByName").mockResolvedValueOnce(
        service
    );
};

export const getOrCreateImageByImageIdentifierMock = (image: Image) => {
    jest.spyOn(
        ImageServices,
        "getOrCreateImageByImageIdentifier"
    ).mockResolvedValueOnce(image);
};

export const findImageByIdMock = (image: Image) => {
    jest.spyOn(ImageServices, "findImageById").mockResolvedValueOnce(image);
};

export const findProjectByNameMock = (project: Project | null) => {
    jest.spyOn(ProjectServices, "findProjectByName").mockResolvedValueOnce(
        project
    );
};

export const createContainerMock = (container: any, throwError?: boolean) => {
    jest.spyOn(DockerLib, "createContainer").mockImplementationOnce(
        async (service, _image, callback) => {
            if (throwError) {
                throw new Error(`${createContainerMock.name} threw an error`);
            }
            callback(service, container);
        }
    );
};

// TODO: maybe mock actual image stream
export const pullImageMock = (image: Image | null, throwError?: boolean) => {
    jest.spyOn(DockerLib, "pullImage").mockImplementationOnce(() => {
        if (throwError) {
            throw new Error(`${pullImageMock.name} threw an error`);
        }
        return new Promise((resolve) => {
            // @ts-ignore
            resolve(new ReadableStream<Image>());
        });
    });
};

export const startContainerMock = (throwError?: boolean) => {
    jest.spyOn(DockerLib, "startContainer").mockImplementationOnce(async () => {
        if (throwError) {
            throw new Error(`${startContainerMock.name} threw an error`);
        }
        return Promise.resolve();
    });
};

export const stopContainerMock = (throwError?: boolean) => {
    jest.spyOn(DockerLib, "stopContainer").mockImplementationOnce(async () => {
        if (throwError) {
            throw new Error(`${stopContainerMock.name} threw an error`);
        }
        return Promise.resolve();
    });
};

export const deleteContainerMock = (throwError?: boolean) => {
    jest.spyOn(DockerLib, "deleteContainer").mockImplementationOnce(
        async () => {
            if (throwError) {
                throw new Error(`${deleteContainerMock.name} threw an error`);
            }
            return Promise.resolve();
        }
    );
};
