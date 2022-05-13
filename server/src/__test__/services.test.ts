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
    hosts: ["httpd.haidousm.com"],
    redirects: [],
    environmentVariables: [],
    order: 1,
};

const createdContainer = {
    id: "12345",
    inspect: async () => {
        return {
            HostConfig: {
                NetworkMode: "traefiker",
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

                    const response = await supertest(app)
                        .post("/services/create")
                        .send(createServiceRequest);
                    expect(response.status).toBe(400);
                });
            });
            describe("given the image does not exist", () => {
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
                        const foundService = createdService;
                        foundService.status = ServiceStatus.CREATED;
                        return foundService;
                    });

                    jest.spyOn(
                        DockerLib,
                        "startContainer"
                    ).mockImplementationOnce(async () => {
                        return Promise.resolve();
                    });

                    jest.spyOn(
                        ServicesService,
                        "saveService"
                    ).mockImplementationOnce(
                        async (service: Service) => service
                    );

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
                        jest.spyOn(
                            ServicesService,
                            "findServiceByName"
                        ).mockImplementationOnce(async () => {
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

                        jest.spyOn(
                            ServicesService,
                            "saveService"
                        ).mockImplementationOnce(
                            async (service: Service) => service
                        );

                        const response = await supertest(app).put(
                            "/services/httpd/start"
                        );
                        expect(response.status).toBe(400);
                    });
                });
            });
            describe("given the service exists and it has RUNNING status", () => {
                it("it should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementation(
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
                    jest.spyOn(passport, "authenticate").mockImplementation(
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
                    jest.spyOn(passport, "authenticate").mockImplementation(
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
            describe("given the service exists and it has CREATED status", () => {
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

                    jest.spyOn(
                        ServicesService,
                        "findServiceByName"
                    ).mockImplementationOnce(async () => {
                        const foundService = createdService;
                        foundService.status = ServiceStatus.CREATED;
                        return foundService;
                    });

                    jest.spyOn(
                        DockerLib,
                        "stopContainer"
                    ).mockImplementationOnce(async () => {
                        return Promise.resolve();
                    });

                    jest.spyOn(
                        ServicesService,
                        "saveService"
                    ).mockImplementationOnce(
                        async (service: Service) => service
                    );

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
                        jest.spyOn(
                            ServicesService,
                            "findServiceByName"
                        ).mockImplementationOnce(async () => {
                            const foundService = createdService;
                            foundService.status = ServiceStatus.CREATED;
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
                            async (service: Service) => service
                        );

                        const response = await supertest(app).put(
                            "/services/httpd/stop"
                        );
                        expect(response.status).toBe(400);
                    });
                });
            });
            describe("given the service exists and it has STOPPED status", () => {
                it("it should return 400", async () => {
                    jest.spyOn(passport, "authenticate").mockImplementation(
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
                    jest.spyOn(passport, "authenticate").mockImplementation(
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
                    jest.spyOn(passport, "authenticate").mockImplementation(
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
});
