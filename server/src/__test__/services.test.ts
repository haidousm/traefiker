/* eslint-disable @typescript-eslint/ban-ts-comment */
/* TODO: fix a bunch of flaky tests? */
import supertest from "supertest";
import createServer from "../utils/server";

import {
    Service,
    Image,
    ServiceStatus,
    User,
    ContainerInfo,
    Project,
} from "@prisma/client";
import {
    authMock,
    createContainerMock,
    createServiceMock,
    deleteContainerMock,
    deleteServiceByNameMock,
    findAllServicesMock,
    findImageByIdMock,
    findProjectByNameMock,
    findServiceByNameMock,
    getOrCreateImageByImageIdentifierMock,
    pullImageMock,
    startContainerMock,
    stopContainerMock,
    updateServiceMock,
} from "./utils/mocks";
import { executeTestCase } from "./utils/misc";

const userA: User = {
    id: 1,
    username: "userA",
    hash: "thisisahash",
    salt: "thisisasalt",
    createdAt: new Date(),
};

const imageA: Image = {
    id: 1,
    name: "httpd",
    tag: "latest",
    repository: "haidousm/httpd",
    createdAt: new Date(),
};

const projectA: Project = {
    id: 1,
    name: "default",
    createdAt: new Date(),
};

const containerA = {
    id: "thisisacontainerid",
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

const containerInfoA: ContainerInfo = {
    id: 1,
    name: "traefiker_httpd",
    network: "web",
    containerId: containerA.id,
};

const serviceA: Service = {
    id: 1,
    name: "httpd",
    status: ServiceStatus.PULLING,
    hosts: ["httpd.haidousm.com"],
    imageId: imageA.id,
    containerInfoId: containerInfoA.id,
    projectId: projectA.id,
    order: 1,
    createdAt: new Date(),
    userId: userA.id,
};

const createServiceRequest = {
    name: "httpd",
    image: "httpd",
    hosts: ["httpd.haidousm.com"],
    project: "default",
};

const invalidCreateServiceRequest = {
    name: "httpd",
    imageName: "httpd", // should be 'image'
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
            const cases = [
                {
                    title: "should return all services",
                    sendRequest: () => {
                        return supertest(app).get("/services");
                    },
                    res: {
                        status: 200,
                        body: [serviceA],
                    },
                    mocks: () => {
                        authMock();
                        findAllServicesMock([serviceA]);
                    },
                },
            ];

            for (const testCase of cases) {
                it(testCase.title, async () => {
                    await executeTestCase(testCase);
                });
            }
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
            const cases = [
                {
                    title: "should create service",
                    sendRequest: () => {
                        return supertest(app)
                            .post("/services/create")
                            .send(createServiceRequest);
                    },
                    res: {
                        status: 200,
                        body: serviceA,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock(null);
                        getOrCreateImageByImageIdentifierMock(imageA);
                        findProjectByNameMock(projectA);
                        createServiceMock(serviceA);
                        createContainerMock(containerA);
                    },
                },
                {
                    title: "should return a 400 given service name already exists",
                    sendRequest: () => {
                        return supertest(app)
                            .post("/services/create")
                            .send(createServiceRequest);
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock(serviceA);
                        getOrCreateImageByImageIdentifierMock(imageA);
                        findProjectByNameMock(projectA);
                        createServiceMock(serviceA);
                        createContainerMock(containerA);
                    },
                },
                {
                    title: "should return a 500 given create container throws an error",
                    sendRequest: () => {
                        return supertest(app)
                            .post("/services/create")
                            .send(createServiceRequest);
                    },
                    res: {
                        status: 500,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock(null);
                        getOrCreateImageByImageIdentifierMock(imageA);
                        findProjectByNameMock(projectA);
                        createServiceMock(serviceA);
                        createContainerMock(containerA, true);
                    },
                },
                {
                    title: "should return a 500 given the image does not exist in docker registry",
                    sendRequest: () => {
                        return supertest(app)
                            .post("/services/create")
                            .send(createServiceRequest);
                    },
                    res: {
                        status: 200,
                        body: {
                            ...serviceA,
                            status: ServiceStatus.ERROR,
                        },
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock(null);
                        getOrCreateImageByImageIdentifierMock(imageA);
                        findProjectByNameMock(projectA);
                        createServiceMock(serviceA);
                        updateServiceMock(serviceA);
                        pullImageMock(imageA, true);
                    },
                },
                {
                    title: "should return a 404 given project does not exist",
                    sendRequest: () => {
                        return supertest(app)
                            .post("/services/create")
                            .send(createServiceRequest);
                    },
                    res: {
                        status: 404,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock(null);
                        getOrCreateImageByImageIdentifierMock(imageA);
                        findProjectByNameMock(null);
                        createServiceMock(serviceA);
                        createContainerMock(containerA);
                    },
                },
                {
                    title: "should return a 400 given the request payload is invalid (zod validation)",
                    sendRequest: () => {
                        return supertest(app)
                            .post("/services/create")
                            .send(invalidCreateServiceRequest);
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                    },
                },
            ];

            for (const testCase of cases) {
                it(testCase.title, async () => {
                    await executeTestCase(testCase);
                });
            }
        });
    });
    describe("update service", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                // TODO: flaky?
                const response = await supertest(app)
                    .put("/services/httpd/update")
                    .send(updateAllRequest);
                expect(response.status).toBe(401);
            });
        });
        describe("given the user is logged in", () => {
            const cases = [
                {
                    title: "should return 400 given an empty request",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app)
                            .put(`/services/${serviceName}/update`)
                            .send(emptyUpdateRequest);
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                    },
                },
                {
                    title: "should return 400 given an invalid request",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app)
                            .put(`/services/${serviceName}/update`)
                            .send(invalidUpdateRequest);
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                    },
                },
                {
                    title: "should return 404 given the service does not exist",
                    sendRequest: () => {
                        const serviceName = "httbatata";
                        return supertest(app)
                            .put(`/services/${serviceName}/update`)
                            .send(updateAllRequest);
                    },
                    res: {
                        status: 404,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock(null);
                    },
                },
                {
                    title: "should return 400 given the service has a PULLING status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app)
                            .put(`/services/${serviceName}/update`)
                            .send(updateAllRequest);
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.PULLING,
                        });
                    },
                },
                {
                    title: "should return service with updated hosts given its an update hosts request",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app)
                            .put(`/services/${serviceName}/update`)
                            .send(updateHostsRequest);
                    },
                    res: {
                        status: 200,
                        body: {
                            ...serviceA,
                            status: ServiceStatus.PULLING,
                            hosts: updateHostsRequest.hosts,
                        },
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.CREATED,
                        });
                        deleteContainerMock();
                        updateServiceMock({
                            ...serviceA,
                            status: ServiceStatus.PULLING,
                            hosts: updateHostsRequest.hosts,
                        });
                        findImageByIdMock(imageA);
                        createContainerMock(postUpdateContainer);
                    },
                },
                // TODO: test redirects & env vars creation
                // {
                //     title: "should return service with updated redirects given its an update redirects request",
                //     sendRequest: () => {
                //         const serviceName = "httpd";
                //         return supertest(app)
                //             .put(`/services/${serviceName}/update`)
                //             .send(updateRedirectsRequest);
                //     },
                //     res: {
                //         status: 200,
                //         body: {
                //             ...serviceA,
                //             status: ServiceStatus.PULLING,
                //             hosts: updateRedirectsRequest.redirects,
                //         },
                //     },
                //     mocks: () => {
                //         authMock(userA);
                //         findServiceByNameMock({
                //             ...serviceA,
                //             status: ServiceStatus.CREATED,
                //         });
                //         deleteContainerMock();
                //         updateServiceMock({
                //             ...serviceA,
                //             status: ServiceStatus.PULLING,
                //             redirects: updateRedirectsRequest.redirects,
                //         });
                //         findImageByIdMock(imageA);
                //         createContainerMock(postUpdateContainer);
                //     },
                // },
                {
                    title: "should return a 500 given the container does not exist",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app)
                            .put(`/services/${serviceName}/update`)
                            .send(updateHostsRequest);
                    },
                    res: {
                        status: 500,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.CREATED,
                        });
                        deleteContainerMock(true);
                    },
                },
            ];

            for (const testCase of cases) {
                it(testCase.title, async () => {
                    await executeTestCase(testCase);
                });
            }
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
            const cases = [
                {
                    title: "should return 404 given the service name does not exist",
                    sendRequest: () => {
                        const serviceName = "httbatata";
                        return supertest(app).put(
                            `/services/${serviceName}/start`
                        );
                    },
                    res: {
                        status: 404,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock(null);
                    },
                },
                {
                    title: "should return a 500 given the container cannot be found",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).put(
                            `/services/${serviceName}/start`
                        );
                    },
                    res: {
                        status: 500,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.CREATED,
                        });
                        startContainerMock(true);
                    },
                },
                {
                    title: "should return the service with RUNNING status if service had CREATED status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).put(
                            `/services/${serviceName}/start`
                        );
                    },
                    res: {
                        status: 200,
                        body: {
                            ...serviceA,
                            status: ServiceStatus.RUNNING,
                        },
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.CREATED,
                        });
                        startContainerMock();
                        updateServiceMock({
                            ...serviceA,
                            status: ServiceStatus.RUNNING,
                        });
                    },
                },
                {
                    title: "should return a 400 given the service already has RUNNING status", // TODO: flaky?
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).put(
                            `/services/${serviceName}/start`
                        );
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.RUNNING,
                        });
                    },
                },
                {
                    title: "should return a 400 given the service already has ERROR status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).put(
                            `/services/${serviceName}/start`
                        );
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.ERROR,
                        });
                    },
                },
                {
                    title: "should return a 400 given the service already has PULLING status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).put(
                            `/services/${serviceName}/start`
                        );
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.PULLING,
                        });
                    },
                },
            ];

            for (const testCase of cases) {
                it(testCase.title, async () => {
                    await executeTestCase(testCase);
                });
            }
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
            const cases = [
                {
                    title: "should return 404 given the service name does not exist",
                    sendRequest: () => {
                        const serviceName = "httbatata";
                        return supertest(app).put(
                            `/services/${serviceName}/stop`
                        );
                    },
                    res: {
                        status: 404,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock(null);
                    },
                },
                {
                    title: "should return a 500 given the container cannot be found",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).put(
                            `/services/${serviceName}/stop`
                        );
                    },
                    res: {
                        status: 500,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.RUNNING,
                        });
                        stopContainerMock(true);
                    },
                },
                {
                    title: "should return the service with STOPPED status if service had RUNNING status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).put(
                            `/services/${serviceName}/stop`
                        );
                    },
                    res: {
                        status: 200,
                        body: {
                            ...serviceA,
                            status: ServiceStatus.STOPPED,
                        },
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.RUNNING,
                        });
                        stopContainerMock();
                        updateServiceMock({
                            ...serviceA,
                            status: ServiceStatus.STOPPED,
                        });
                    },
                },
                {
                    title: "should return a 400 given the service already has STOPPED status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).put(
                            `/services/${serviceName}/stop`
                        );
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.STOPPED,
                        });
                    },
                },
                {
                    title: "should return a 400 given the service already has ERROR status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).put(
                            `/services/${serviceName}/stop`
                        );
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.ERROR,
                        });
                    },
                },
                {
                    title: "should return a 400 given the service already has PULLING status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).put(
                            `/services/${serviceName}/stop`
                        );
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.PULLING,
                        });
                    },
                },
            ];

            for (const testCase of cases) {
                it(testCase.title, async () => {
                    await executeTestCase(testCase);
                });
            }
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
            const cases = [
                {
                    title: "should return 404 given the service name does not exist",
                    sendRequest: () => {
                        const serviceName = "httbatata";
                        return supertest(app).delete(
                            `/services/${serviceName}/delete`
                        );
                    },
                    res: {
                        status: 404,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock(null);
                    },
                },
                {
                    title: "should return a 500 given the container cannot be found",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).delete(
                            `/services/${serviceName}/delete`
                        );
                    },
                    res: {
                        status: 500,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.STOPPED,
                        });
                        deleteContainerMock(true);
                    },
                },
                {
                    title: "should return 200 given the service had CREATED || STOPPED status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).delete(
                            `/services/${serviceName}/delete`
                        );
                    },
                    res: {
                        status: 200,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.CREATED,
                        });
                        deleteContainerMock();
                        deleteServiceByNameMock(serviceA);
                    },
                },
                {
                    title: "should return a 400 given the service has RUNNING status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).delete(
                            `/services/${serviceName}/delete`
                        );
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.RUNNING,
                        });
                    },
                },
                {
                    title: "should return a 400 given the service has PULLING status",
                    sendRequest: () => {
                        const serviceName = "httpd";
                        return supertest(app).delete(
                            `/services/${serviceName}/delete`
                        );
                    },
                    res: {
                        status: 400,
                    },
                    mocks: () => {
                        authMock(userA);
                        findServiceByNameMock({
                            ...serviceA,
                            status: ServiceStatus.PULLING,
                        });
                    },
                },
            ];

            for (const testCase of cases) {
                it(testCase.title, async () => {
                    await executeTestCase(testCase);
                });
            }
        });
    });

    //     describe("update services ordering", () => {
    //         describe("given the user is not logged in", () => {
    //             it("should return 401", async () => {
    //                 const response = await supertest(app).put("/services/order");
    //                 expect(response.status).toBe(401);
    //             });
    //         });
    //         describe("given the user is logged in", () => {
    //             describe("given an invalid request", () => {
    //                 it("should return 400", async () => {
    //                     jest.spyOn(passport, "authenticate").mockImplementationOnce(
    //                         () => {
    //                             return (
    //                                 req: Request,
    //                                 res: Response,
    //                                 next: NextFunction
    //                             ) => {
    //                                 next();
    //                             };
    //                         }
    //                     );
    //                     const response = await supertest(app)
    //                         .put("/services/order")
    //                         .send({
    //                             service: [],
    //                         });
    //                     expect(response.status).toBe(400);
    //                 });
    //             });
    //             describe("given something throws", () => {
    //                 it("should return 500", async () => {
    //                     jest.spyOn(passport, "authenticate").mockImplementationOnce(
    //                         () => {
    //                             return (
    //                                 req: Request,
    //                                 res: Response,
    //                                 next: NextFunction
    //                             ) => {
    //                                 next();
    //                             };
    //                         }
    //                     );
    //                     const findServiceByNameMock = jest
    //                         .spyOn(ServicesService, "findServiceByName")
    //                         .mockImplementation(async () => {
    //                             throw new Error("Something went wrong");
    //                         });
    //                     jest.spyOn(ServicesService, "saveService")
    //                         // @ts-ignore
    //                         .mockImplementationOnce((service: Service) => service);
    //                     const response = await supertest(app)
    //                         .put("/services/order")
    //                         .send({
    //                             services: [{ name: "httpd", order: 2 }],
    //                         });
    //                     expect(response.status).toBe(500);
    //                     findServiceByNameMock.mockClear();
    //                 });
    //             });
    //             describe("given one of the services is not found", () => {
    //                 it("should return 404", async () => {
    //                     jest.spyOn(passport, "authenticate").mockImplementationOnce(
    //                         () => {
    //                             return (
    //                                 req: Request,
    //                                 res: Response,
    //                                 next: NextFunction
    //                             ) => {
    //                                 next();
    //                             };
    //                         }
    //                     );
    //                     const findServiceByNameMock = jest
    //                         .spyOn(ServicesService, "findServiceByName")
    //                         .mockImplementation(async (name: string) => {
    //                             if (name === "httpd") {
    //                                 return Promise.resolve(createdService);
    //                             }
    //                             return Promise.resolve(null);
    //                         });
    //                     const saveServiceMock = jest
    //                         .spyOn(ServicesService, "saveService")
    //                         // @ts-ignore
    //                         .mockImplementationOnce((service: Service) => service);
    //                     const response = await supertest(app)
    //                         .put("/services/order")
    //                         .send({
    //                             services: [
    //                                 { name: "httpd", order: 2 },
    //                                 { name: "notfound", order: 1 },
    //                             ],
    //                         });
    //                     expect(response.status).toBe(404);
    //                     expect(saveServiceMock).toHaveBeenCalledTimes(0);
    //                     findServiceByNameMock.mockClear();
    //                 });
    //             });
    //             describe("given all the services are found", () => {
    //                 it("should return 200", async () => {
    //                     jest.spyOn(passport, "authenticate").mockImplementationOnce(
    //                         () => {
    //                             return (
    //                                 req: Request,
    //                                 res: Response,
    //                                 next: NextFunction
    //                             ) => {
    //                                 next();
    //                             };
    //                         }
    //                     );
    //                     const findServiceByNameMock = jest
    //                         .spyOn(ServicesService, "findServiceByName")
    //                         .mockImplementation(async (name: string) => {
    //                             if (name === "httpd") {
    //                                 return Promise.resolve(createdService);
    //                             }
    //                             return Promise.resolve(null);
    //                         });
    //                     const saveServiceMock = jest
    //                         .spyOn(ServicesService, "saveService")
    //                         // @ts-ignore
    //                         .mockImplementationOnce((service: Service) => service);
    //                     const response = await supertest(app)
    //                         .put("/services/order")
    //                         .send({
    //                             services: [{ name: "httpd", order: 2 }],
    //                         });
    //                     expect(response.status).toBe(200);
    //                     expect(response.body[0].order).toBe(2);
    //                     expect(saveServiceMock).toHaveBeenCalledTimes(1);
    //                     findServiceByNameMock.mockClear();
    //                 });
    //             });
    //         });
    //     });
});
