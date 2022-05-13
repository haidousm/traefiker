/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from "supertest";
import createServer from "../utils/server";
import passport from "passport";

import * as ServicesService from "../services/services.service";
import * as ImagesService from "../services/images.service";
import * as DockerLib from "../../libs/docker";
import { NextFunction, Request, Response } from "express";
import { Service } from "../types/Service";
import { ServiceStatus } from "../types/enums/ServiceStatus";
import { Image } from "../types/Image";

const createServiceRequest = {
    name: "httpd",
    image: "httpd",
    hosts: ["httpd.haidousm.com"],
};

const invalidCreateServiceRequest = {
    name: "httpd",
    imageName: "httpd",
    hosts: ["httpd.haidousm.com"],
};

const createdImage: Image = {
    id: "5312949241",
    name: "httpd",
    tag: "latest",
    repository: "haidousm/httpd",
};

const createdService: Service = {
    name: "httpd",
    status: ServiceStatus.PULLING,
    image: createdImage,
    network: "web",
    hosts: ["httpd.haidousm.com"],
    redirects: [],
    environmentVariables: [],
    order: 0,
    containerId: "",
};

const createdContainer = {
    id: "12345",
};

const app = createServer();

describe("services", () => {
    describe("get all services", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app).get("/services");
                expect(response.status).toBe(401);
            });
        });
        describe("given user is logged in", () => {
            it("should return all services", async () => {
                jest.spyOn(passport, "authenticate").mockImplementation(() => {
                    return (
                        req: Request,
                        res: Response,
                        next: NextFunction
                    ) => {
                        next();
                    };
                });

                jest.spyOn(ServicesService, "findAllServices")
                    // @ts-ignore
                    .mockReturnValueOnce([createdService]);

                const response = await supertest(app).get("/services");
                expect(response.status).toBe(200);
                expect(response.body).toEqual([createdService]);
            });
        });
    });
    describe("create new service", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app)
                    .post("/services/create")
                    .send(createServiceRequest);
                expect(response.status).toBe(401);
            });
        });
        describe("given the user is logged in", () => {
            describe("given the create service payload is valid", () => {
                it("should create service", async () => {
                    passport.authenticate = jest.fn(() => {
                        return (
                            req: Request,
                            res: Response,
                            next: NextFunction
                        ) => {
                            next();
                        };
                    });

                    jest.spyOn(ServicesService, "findServiceByName")
                        //@ts-ignore
                        .mockReturnValueOnce(null);

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    jest.spyOn(DockerLib, "createContainer")
                        //@ts-ignore
                        .mockImplementationOnce(
                            async (service, image, callback) =>
                                //@ts-ignore
                                callback(service, createdContainer)
                        );

                    const response = await supertest(app)
                        .post("/services/create")
                        .send(createServiceRequest);

                    const expectedService = {
                        ...createdService,
                        containerId: createdContainer.id,
                        status: ServiceStatus.CREATED,
                    };
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expectedService);
                });
            });

            describe("given the service already exists", () => {
                it("should return a 400", async () => {
                    passport.authenticate = jest.fn(() => {
                        return (
                            req: Request,
                            res: Response,
                            next: NextFunction
                        ) => {
                            next();
                        };
                    });

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockReturnValueOnce(createdService);

                    const response = await supertest(app)
                        .post("/services/create")
                        .send(createServiceRequest);
                    expect(response.status).toBe(400);
                });
            });
            describe("given create container throws an error", () => {
                it("should return a 400", async () => {
                    passport.authenticate = jest.fn(() => {
                        return (
                            req: Request,
                            res: Response,
                            next: NextFunction
                        ) => {
                            next();
                        };
                    });

                    jest.spyOn(ServicesService, "findServiceByName")
                        //@ts-ignore
                        .mockReturnValueOnce(null);

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    jest.spyOn(DockerLib, "createContainer")
                        //@ts-ignore
                        .mockImplementationOnce(() => {
                            throw new Error();
                        });

                    const response = await supertest(app)
                        .post("/services/create")
                        .send(createServiceRequest);
                    expect(response.status).toBe(400);
                });
            });
            describe("given the image does not exist", () => {
                it("should return a 400", async () => {
                    passport.authenticate = jest.fn(() => {
                        return (
                            req: Request,
                            res: Response,
                            next: NextFunction
                        ) => {
                            next();
                        };
                    });

                    jest.spyOn(ServicesService, "findServiceByName")
                        //@ts-ignore
                        .mockReturnValueOnce(null);

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    jest.spyOn(DockerLib, "pullImage")
                        //@ts-ignore
                        .mockImplementationOnce(() => {
                            throw new Error("Image does not exist");
                        });

                    const response = await supertest(app)
                        .post("/services/create")
                        .send(createServiceRequest);
                    expect(response.status).toBe(200);
                    expect(response.body.status).toBe(ServiceStatus.ERROR);
                });
            });
            describe("given the create service payload is invalid", () => {
                it("should return a 400", async () => {
                    passport.authenticate = jest.fn(() => {
                        return (
                            req: Request,
                            res: Response,
                            next: NextFunction
                        ) => {
                            next();
                        };
                    });

                    const response = await supertest(app)
                        .post("/services/create")
                        .send(invalidCreateServiceRequest);
                    expect(response.status).toBe(400);
                });
            });
        });
    });
});
