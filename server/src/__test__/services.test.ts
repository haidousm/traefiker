/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from "supertest";
import createServer from "../utils/server";
import passport from "passport";

import * as ServicesService from "../services/services.service";
import * as ImagesService from "../services/images.service";
import * as ProjectsService from "../services/projects.service";
import * as DockerLib from "../../libs/docker";
import { NextFunction, Request, Response } from "express";
import { Service } from "../types/Service";
import { ServiceStatus } from "../types/enums/ServiceStatus";
import { Image } from "../types/Image";
import { Project } from "../types/Project";
import { HydratedDocument } from "mongoose";

const createServiceRequest = {
    name: "httpd",
    image: "httpd",
    hosts: ["httpd.haidousm.com"],
    project: "default",
};

const invalidCreateServiceRequest = {
    name: "httpd",
    imageName: "httpd",
    hosts: ["httpd.haidousm.com"],
};

const updateHostsRequest = {
    hosts: ["haidousm.com/httpd"],
};
const updateRedirectsRequest = {
    redirects: [
        {
            from: "http://haidousm.com/httpd",
            to: "httpd.haidousm.com",
        },
    ],
};
const updateEnvironmentVariablesRequest = {
    environmentVariables: [
        {
            key: "PORT",
            value: "80",
        },
    ],
};

const emptyUpdateRequest = {};

const updateAllRequest = {
    hosts: updateHostsRequest.hosts,
    redirects: updateRedirectsRequest.redirects,
    environmentVariables:
        updateEnvironmentVariablesRequest.environmentVariables,
};

const invalidUpdateRequest = {
    host: ["httpd.haidousm.com"],
    redirects: [
        {
            FROM: "http://haidousm.com/httpd",
            to: "httpd.haidousm.com",
        },
    ],
    environmentVariables: [
        {
            name: "PORT",
            value: "80",
        },
    ],
};

const mockProject: Project = {
    name: "default",
};

const createdImage: Image = {
    name: "httpd",
    tag: "latest",
    repository: "haidousm/httpd",
};

const createdService: Service = {
    name: "httpd",
    status: ServiceStatus.PULLING,
    image: createdImage,
    hosts: ["httpd.haidousm.com"],
    redirects: [],
    environmentVariables: [],
    order: 1,
    project: mockProject,
};

const createdContainer = {
    id: "12345",
    inspect: async () => {
        return {
            HostConfig: {
                NetworkMode: "web",
            },
            Config: {
                Env: ["PORT=80"],
            },
        };
    },
};

const postUpdateContainer = {
    id: "54321",
    inspect: async () => {
        return {
            HostConfig: {
                NetworkMode: "web",
            },
            Config: {
                Env: ["PORT=80"],
            },
        };
    },
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
                jest.spyOn(passport, "authenticate").mockImplementationOnce(
                    () => {
                        return (
                            req: Request,
                            res: Response,
                            next: NextFunction
                        ) => {
                            next();
                        };
                    }
                );

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
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        //@ts-ignore
                        .mockReturnValueOnce(null);

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(ProjectsService, "findProjectByName")
                        // @ts-ignore
                        .mockReturnValueOnce(mockProject);

                    jest.spyOn(ServicesService, "findLastUsedOrder")
                        //@ts-ignore
                        .mockReturnValueOnce(0);

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

                    expect(response.status).toBe(200);
                    console.log(response.body);
                    expect(response.body).toEqual(createdService);
                });
            });

            describe("given the service already exists", () => {
                it("should return a 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

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
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        //@ts-ignore
                        .mockReturnValueOnce(null);

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(ProjectsService, "findProjectByName")
                        // @ts-ignore
                        .mockReturnValueOnce(mockProject);
                    jest.spyOn(ServicesService, "findLastUsedOrder")
                        //@ts-ignore
                        .mockReturnValueOnce(0);

                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    jest.spyOn(DockerLib, "createContainer")
                        //@ts-ignore
                        .mockImplementationOnce(() => {
                            throw new Error();
                        });
                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    const response = await supertest(app)
                        .post("/services/create")
                        .send(createServiceRequest);
                    expect(response.status).toBe(500);
                });
            });
            describe("given the image does not exist", () => {
                it("should return a 500", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        //@ts-ignore
                        .mockReturnValueOnce(null);

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(ProjectsService, "findProjectByName")
                        // @ts-ignore
                        .mockReturnValueOnce(mockProject);

                    jest.spyOn(ServicesService, "findLastUsedOrder")
                        //@ts-ignore
                        .mockReturnValueOnce(0);
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
            describe("given the project does not exist", () => {
                it("should return a 404", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        //@ts-ignore
                        .mockReturnValueOnce(null);

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(ProjectsService, "findProjectByName")
                        // @ts-ignore
                        .mockReturnValueOnce(null);

                    const response = await supertest(app)
                        .post("/services/create")
                        .send(createServiceRequest);
                    expect(response.status).toBe(404);
                });
            });
            describe("given the create service payload is invalid", () => {
                it("should return a 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    const response = await supertest(app)
                        .post("/services/create")
                        .send(invalidCreateServiceRequest);
                    expect(response.status).toBe(400);
                });
            });
        });
    });
    describe("start service", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app).put(
                    "/services/httpd/start"
                );
                expect(response.status).toBe(401);
            });
        });
        describe("given the user is logged in", () => {
            describe("given the service does not exist", () => {
                it("it should return 404", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(
                        ServicesService,
                        "findServiceByName"
                    ).mockImplementationOnce(async () => {
                        return null;
                    });

                    const response = await supertest(app).put(
                        "/services/httpd/start"
                    );
                    expect(response.status).toBe(404);
                });
            });
            describe("given the service exists and it has CREATED status", () => {
                it("it should return the service with RUNNING status", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(
                        ServicesService,
                        "findServiceByName"
                    ).mockImplementationOnce(async () => {
                        const foundService =
                            createdService as unknown as HydratedDocument<Service>;
                        foundService.status = ServiceStatus.CREATED;
                        return foundService;
                    });

                    jest.spyOn(
                        DockerLib,
                        "startContainer"
                    ).mockImplementationOnce(async () => {
                        return Promise.resolve();
                    });

                    jest.spyOn(ServicesService, "saveService")
                        //@ts-ignore
                        .mockImplementationOnce(async (service) => service);

                    const response = await supertest(app).put(
                        "/services/httpd/start"
                    );
                    expect(response.status).toBe(200);
                    expect(response.body.status).toBe(ServiceStatus.RUNNING);
                });
                describe("given the container cannot be found", () => {
                    it("it should return a 400", async () => {
                        jest.spyOn(
                            passport,
                            "authenticate"
                        ).mockImplementationOnce(() => {
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
                            .mockImplementationOnce(async () => {
                                const foundService = createdService;
                                foundService.status = ServiceStatus.CREATED;
                                return foundService;
                            });

                        jest.spyOn(
                            DockerLib,
                            "startContainer"
                        ).mockImplementationOnce(async () => {
                            throw new Error("Container not found");
                        });

                        jest.spyOn(ServicesService, "saveService")
                            //@ts-ignore
                            .mockImplementationOnce(async (service) => service);

                        const response = await supertest(app).put(
                            "/services/httpd/start"
                        );
                        expect(response.status).toBe(500);
                    });
                });
            });
            describe("given the service exists and it has RUNNING status", () => {
                it("it should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.RUNNING;
                            return foundService;
                        });

                    const response = await supertest(app).put(
                        "/services/httpd/start"
                    );
                    expect(response.status).toBe(400);
                });
            });
            describe("given the service exists and it has ERROR status", () => {
                it("it should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.ERROR;
                            return foundService;
                        });

                    const response = await supertest(app).put(
                        "/services/httpd/start"
                    );
                    expect(response.status).toBe(400);
                });
            });
            describe("given the service exists and it has PULLING status", () => {
                it("it should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.PULLING;
                            return foundService;
                        });

                    const response = await supertest(app).put(
                        "/services/httpd/start"
                    );
                    expect(response.status).toBe(400);
                });
            });
        });
    });
    describe("update service", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app)
                    .put("/services/httpd/update")
                    .send(emptyUpdateRequest);
                expect(response.status).toBe(401);
            });
        });
        describe("given the user is logged in", () => {
            describe("given an empty request", () => {
                it("should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    const response = await supertest(app)
                        .put("/services/httpd/update")
                        .send(emptyUpdateRequest);
                    expect(response.status).toBe(400);
                });
            });
            describe("given an invalid request", () => {
                it("should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );
                    const response = await supertest(app)
                        .put("/services/httpd/update")
                        .send(invalidUpdateRequest);
                    expect(response.status).toBe(400);
                });
            });
            describe("given the service does not exist", () => {
                it("should return 404", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );
                    jest.spyOn(
                        ServicesService,
                        "findServiceByName"
                    ).mockImplementationOnce(async () => {
                        return null;
                    });
                    const response = await supertest(app)
                        .put("/services/httpd/update")
                        .send(updateAllRequest);
                    expect(response.status).toBe(404);
                });
            });
            describe("given the service exists and it has PULLING status", () => {
                it("should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );
                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.PULLING;
                            return foundService;
                        });
                    const response = await supertest(app)
                        .put("/services/httpd/update")
                        .send(updateAllRequest);
                    expect(response.status).toBe(400);
                });
            });
            describe("given the service exists and its an update HOSTS request", () => {
                it("should return the service with updated hosts", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );
                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.CREATED;
                            return foundService;
                        });

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(
                        DockerLib,
                        "deleteContainer"
                    ).mockImplementationOnce(async () => {
                        return Promise.resolve();
                    });

                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    jest.spyOn(DockerLib, "createContainer")
                        //@ts-ignore
                        .mockImplementationOnce(
                            async (service, image, callback) =>
                                //@ts-ignore
                                callback(service, postUpdateContainer)
                        );

                    const response = await supertest(app)
                        .put("/services/httpd/update")
                        .send(updateHostsRequest);

                    expect(response.status).toBe(200);
                    expect(response.body.hosts).toStrictEqual(
                        updateHostsRequest.hosts
                    );
                });
            });
            describe("given the service exists and its an update REDIRECTS request", () => {
                it("should return the service with updated redirects", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );
                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.CREATED;
                            return foundService;
                        });

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(
                        DockerLib,
                        "deleteContainer"
                    ).mockImplementationOnce(async () => {
                        return Promise.resolve();
                    });

                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    jest.spyOn(DockerLib, "createContainer")
                        //@ts-ignore
                        .mockImplementationOnce(
                            async (service, image, callback) =>
                                //@ts-ignore
                                callback(service, postUpdateContainer)
                        );

                    const response = await supertest(app)
                        .put("/services/httpd/update")
                        .send(updateRedirectsRequest);

                    expect(response.status).toBe(200);
                    expect(response.body.redirects).toStrictEqual(
                        updateRedirectsRequest.redirects
                    );
                });
            });
            describe("given the service exists and its an update ENVIRONMENT VARIABLES request", () => {
                it("should return the service with updated environment variables", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );
                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.CREATED;
                            return foundService;
                        });

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(
                        DockerLib,
                        "deleteContainer"
                    ).mockImplementationOnce(async () => {
                        return Promise.resolve();
                    });

                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    jest.spyOn(DockerLib, "createContainer")
                        //@ts-ignore
                        .mockImplementationOnce(
                            async (service, image, callback) =>
                                //@ts-ignore
                                callback(service, postUpdateContainer)
                        );

                    const response = await supertest(app)
                        .put("/services/httpd/update")
                        .send(updateEnvironmentVariablesRequest);

                    expect(response.status).toBe(200);
                    expect(response.body.environmentVariables).toStrictEqual(
                        updateEnvironmentVariablesRequest.environmentVariables
                    );
                });
            });
            describe("given the service exists and its an update ALL request", () => {
                it("should return the service with updated ALL", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );
                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.CREATED;
                            return foundService;
                        });

                    jest.spyOn(
                        ImagesService,
                        "getOrCreateImageByImageIdentifier"
                    )
                        // @ts-ignore
                        .mockReturnValueOnce(createdImage);

                    jest.spyOn(
                        DockerLib,
                        "deleteContainer"
                    ).mockImplementationOnce(async () => {
                        return Promise.resolve();
                    });

                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    jest.spyOn(DockerLib, "createContainer")
                        //@ts-ignore
                        .mockImplementationOnce(
                            async (service, image, callback) =>
                                //@ts-ignore
                                callback(service, postUpdateContainer)
                        );

                    const response = await supertest(app)
                        .put("/services/httpd/update")
                        .send(updateAllRequest);

                    expect(response.status).toBe(200);
                    expect(response.body.hosts).toStrictEqual(
                        updateAllRequest.hosts
                    );
                    expect(response.body.redirects).toStrictEqual(
                        updateAllRequest.redirects
                    );
                    expect(response.body.environmentVariables).toStrictEqual(
                        updateAllRequest.environmentVariables
                    );
                });
                describe("given the container does not exist", () => {
                    it("should return a 400", async () => {
                        jest.spyOn(
                            passport,
                            "authenticate"
                        ).mockImplementationOnce(() => {
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
                            .mockImplementationOnce(async () => {
                                const foundService = createdService;
                                foundService.status = ServiceStatus.CREATED;
                                return foundService;
                            });

                        jest.spyOn(
                            ImagesService,
                            "getOrCreateImageByImageIdentifier"
                        )
                            // @ts-ignore
                            .mockReturnValueOnce(createdImage);

                        jest.spyOn(
                            DockerLib,
                            "deleteContainer"
                        ).mockImplementationOnce(async () => {
                            throw new Error("Container does not exist");
                        });

                        jest.spyOn(
                            ServicesService,
                            "saveService"
                        ).mockImplementationOnce(
                            // @ts-ignore
                            (service: Service) => service
                        );

                        jest.spyOn(DockerLib, "createContainer")
                            //@ts-ignore
                            .mockImplementationOnce(
                                async (service, image, callback) =>
                                    //@ts-ignore
                                    callback(service, postUpdateContainer)
                            );

                        const response = await supertest(app)
                            .put("/services/httpd/update")
                            .send(updateAllRequest);

                        expect(response.status).toBe(500);
                    });
                });
            });
        });
    });
    describe("stop service", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app).put(
                    "/services/httpd/stop"
                );
                expect(response.status).toBe(401);
            });
        });
        describe("given the user is logged in", () => {
            describe("given the service does not exist", () => {
                it("it should return 404", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(
                        ServicesService,
                        "findServiceByName"
                    ).mockImplementationOnce(async () => {
                        return null;
                    });

                    const response = await supertest(app).put(
                        "/services/httpd/stop"
                    );
                    expect(response.status).toBe(404);
                });
            });
            describe("given the service exists and it has RUNNING status", () => {
                it("it should return the service with STOPPED status", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.RUNNING;
                            return foundService;
                        });

                    jest.spyOn(
                        DockerLib,
                        "stopContainer"
                    ).mockImplementationOnce(async () => {
                        return Promise.resolve();
                    });

                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    const response = await supertest(app).put(
                        "/services/httpd/stop"
                    );
                    expect(response.status).toBe(200);
                    expect(response.body.status).toBe(ServiceStatus.STOPPED);
                });
                describe("given the container cannot be found", () => {
                    it("it should return a 400", async () => {
                        jest.spyOn(
                            passport,
                            "authenticate"
                        ).mockImplementationOnce(() => {
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
                            .mockImplementationOnce(async () => {
                                const foundService = createdService;
                                foundService.status = ServiceStatus.RUNNING;
                                return foundService;
                            });

                        jest.spyOn(
                            DockerLib,
                            "stopContainer"
                        ).mockImplementationOnce(async () => {
                            throw new Error("Container not found");
                        });

                        jest.spyOn(
                            ServicesService,
                            "saveService"
                        ).mockImplementationOnce(
                            // @ts-ignore
                            (service: Service) => service
                        );

                        const response = await supertest(app).put(
                            "/services/httpd/stop"
                        );
                        expect(response.status).toBe(500);
                    });
                });
            });
            describe("given the service exists and it has STOPPED status", () => {
                it("it should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.STOPPED;
                            return foundService;
                        });

                    const response = await supertest(app).put(
                        "/services/httpd/stop"
                    );
                    expect(response.status).toBe(400);
                });
            });
            describe("given the service exists and it has ERROR status", () => {
                it("it should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.ERROR;
                            return foundService;
                        });

                    const response = await supertest(app).put(
                        "/services/httpd/stop"
                    );
                    expect(response.status).toBe(400);
                });
            });
            describe("given the service exists and it has PULLING status", () => {
                it("it should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.PULLING;
                            return foundService;
                        });

                    const response = await supertest(app).put(
                        "/services/httpd/stop"
                    );
                    expect(response.status).toBe(400);
                });
            });
        });
    });
    describe("delete service", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app).delete(
                    "/services/httpd/delete"
                );
                expect(response.status).toBe(401);
            });
        });
        describe("given the user is logged in", () => {
            describe("given the service does not exist", () => {
                it("it should return 404", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(
                        ServicesService,
                        "findServiceByName"
                    ).mockImplementationOnce(async () => {
                        return null;
                    });

                    const response = await supertest(app).delete(
                        "/services/httpd/delete"
                    );
                    expect(response.status).toBe(404);
                });
            });
            describe("given the service exists and it has CREATED or STOPPED status", () => {
                it("it should return 200", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.CREATED;
                            return foundService;
                        });

                    jest.spyOn(
                        DockerLib,
                        "deleteContainer"
                    ).mockImplementationOnce(async () => {
                        return Promise.resolve();
                    });

                    jest.spyOn(ServicesService, "deleteServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            return Promise.resolve();
                        });

                    const response = await supertest(app).delete(
                        "/services/httpd/delete"
                    );
                    expect(response.status).toBe(200);
                });
                describe("given the container cannot be found", () => {
                    it("it should return a 400", async () => {
                        jest.spyOn(
                            passport,
                            "authenticate"
                        ).mockImplementationOnce(() => {
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
                            .mockImplementationOnce(async () => {
                                const foundService = createdService;
                                foundService.status = ServiceStatus.CREATED;
                                return foundService;
                            });

                        jest.spyOn(
                            DockerLib,
                            "deleteContainer"
                        ).mockImplementationOnce(async () => {
                            throw new Error("Container not found");
                        });

                        const response = await supertest(app).delete(
                            "/services/httpd/delete"
                        );
                        expect(response.status).toBe(500);
                    });
                });
            });
            describe("given the service exists and it has RUNNING status", () => {
                it("it should return 200", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.RUNNING;
                            return foundService;
                        });

                    const stopContainerMock = jest
                        .spyOn(DockerLib, "stopContainer")
                        .mockImplementationOnce(async () => {
                            return Promise.resolve();
                        });

                    jest.spyOn(
                        DockerLib,
                        "deleteContainer"
                    ).mockImplementationOnce(async (service: Service) => {
                        await DockerLib.stopContainer(service);
                        return Promise.resolve();
                    });

                    jest.spyOn(ServicesService, "deleteServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            return Promise.resolve();
                        });

                    const response = await supertest(app).delete(
                        "/services/httpd/delete"
                    );
                    expect(response.status).toBe(200);
                    expect(stopContainerMock).toHaveBeenCalledTimes(1);
                });
            });
            describe("given the service exists and it has PULLING status", () => {
                it("it should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    jest.spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.PULLING;
                            return foundService;
                        });

                    const response = await supertest(app).delete(
                        "/services/httpd/delete"
                    );
                    expect(response.status).toBe(400);
                });
            });
        });
    });
    describe("update services ordering", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app).put("/services/order");
                expect(response.status).toBe(401);
            });
        });
        describe("given the user is logged in", () => {
            describe("given an invalid request", () => {
                it("should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    const response = await supertest(app)
                        .put("/services/order")
                        .send({
                            service: [],
                        });
                    expect(response.status).toBe(400);
                });
            });
            describe("given something throws", () => {
                it("should return 500", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    const findServiceByNameMock = jest
                        .spyOn(ServicesService, "findServiceByName")
                        .mockImplementation(async () => {
                            throw new Error("Something went wrong");
                        });

                    jest.spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    const response = await supertest(app)
                        .put("/services/order")
                        .send({
                            services: [{ name: "httpd", order: 2 }],
                        });
                    expect(response.status).toBe(500);
                    findServiceByNameMock.mockClear();
                });
            });
            describe("given one of the services is not found", () => {
                it("should return 404", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    const findServiceByNameMock = jest
                        .spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementation(async (name: string) => {
                            if (name === "httpd") {
                                return Promise.resolve(createdService);
                            }
                            return Promise.resolve(null);
                        });

                    const saveServiceMock = jest
                        .spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    const response = await supertest(app)
                        .put("/services/order")
                        .send({
                            services: [
                                { name: "httpd", order: 2 },
                                { name: "notfound", order: 1 },
                            ],
                        });
                    expect(response.status).toBe(404);
                    expect(saveServiceMock).toHaveBeenCalledTimes(0);
                    findServiceByNameMock.mockClear();
                });
            });
            describe("given all the services are found", () => {
                it("should return 200", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementationOnce(
                        () => {
                            return (
                                req: Request,
                                res: Response,
                                next: NextFunction
                            ) => {
                                next();
                            };
                        }
                    );

                    const findServiceByNameMock = jest
                        .spyOn(ServicesService, "findServiceByName")
                        // @ts-ignore
                        .mockImplementation(async (name: string) => {
                            if (name === "httpd") {
                                return Promise.resolve(createdService);
                            }
                            return Promise.resolve(null);
                        });

                    const saveServiceMock = jest
                        .spyOn(ServicesService, "saveService")
                        // @ts-ignore
                        .mockImplementationOnce((service: Service) => service);

                    const response = await supertest(app)
                        .put("/services/order")
                        .send({
                            services: [{ name: "httpd", order: 2 }],
                        });
                    expect(response.status).toBe(200);
                    expect(response.body[0].order).toBe(2);
                    expect(saveServiceMock).toHaveBeenCalledTimes(1);
                    findServiceByNameMock.mockClear();
                });
            });
        });
    });
});
