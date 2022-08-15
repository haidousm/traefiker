/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    Project,
    Image,
    Service,
    ServiceStatus,
    ContainerInfo,
    User,
} from "@prisma/client";
import supertest from "supertest";
import createServer from "../utils/server";
import { executeTestCase } from "./utils/misc";
import {
    authMock,
    findAllProjectsMock,
    findAllServicesByProjectNameMock,
    findProjectByNameMock,
    findServiceByNameMock,
    updateServiceMock,
} from "./utils/mocks";

// TODO: move all mock data to a single place
const userA: User = {
    id: 1,
    username: "userA",
    hash: "thisisahash",
    salt: "thisisasalt",
    createdAt: new Date(),
};

const projectA: Project = {
    id: 1,
    name: "default",
    createdAt: new Date(),
};

const projectB: Project = {
    id: 2,
    name: "ProjectB",
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

const imageA: Image = {
    id: 1,
    name: "httpd",
    tag: "latest",
    repository: "haidousm/httpd",
    createdAt: new Date(),
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

const app = createServer();

describe("projects", () => {
    describe("get all projects", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app).get("/projects");
                expect(response.status).toBe(401);
            });
        });
        describe("given user is logged in", () => {
            const cases = [
                {
                    title: "should return all projects",
                    sendRequest: () => {
                        return supertest(app).get("/projects");
                    },
                    res: {
                        status: 200,
                        body: [projectA, projectB],
                    },
                    mocks: () => {
                        authMock();
                        findAllProjectsMock([projectA, projectB]);
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
    describe("get a project", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app).get("/projects/default");
                expect(response.status).toBe(401);
            });
        });
        describe("given user is logged in", () => {
            const cases = [
                {
                    title: "should return the project given the project exists",
                    sendRequest: () => {
                        return supertest(app).get("/projects/default");
                    },
                    res: {
                        status: 200,
                        body: projectA,
                    },
                    mocks: () => {
                        authMock();
                        findProjectByNameMock(projectA);
                    },
                },
                {
                    title: "should return a 404 given the project does not exist",
                    sendRequest: () => {
                        return supertest(app).get("/projects/batata");
                    },
                    res: {
                        status: 404,
                    },
                    mocks: () => {
                        authMock();
                        findProjectByNameMock(null);
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
    describe("get all services for project", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app).get(
                    "/projects/default/services"
                );
                expect(response.status).toBe(401);
            });
        });
        describe("given user is logged in", () => {
            const cases = [
                {
                    title: "should return all services for project given project exists",
                    sendRequest: () => {
                        return supertest(app).get("/projects/default/services");
                    },
                    res: {
                        status: 200,
                        body: [serviceA],
                    },
                    mocks: () => {
                        authMock();
                        findAllServicesByProjectNameMock([serviceA]);
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
    describe("add service to project", () => {
        describe("given the user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app).put(
                    "/projects/ProjectA/services/httpd"
                );
                expect(response.status).toBe(401);
            });
        });
        describe("given user is logged in", () => {
            const cases = [
                {
                    title: "should return a 404 given the project does not exist",
                    sendRequest: () => {
                        return supertest(app).put(
                            "/projects/batata/services/httpd"
                        );
                    },
                    res: {
                        status: 404,
                    },
                    mocks: () => {
                        authMock();
                        findProjectByNameMock(null);
                    },
                },
                {
                    title: "should return a 404 given the service does not exist",
                    sendRequest: () => {
                        return supertest(app).put(
                            "/projects/ProjectB/services/batata"
                        );
                    },
                    res: {
                        status: 404,
                    },
                    mocks: () => {
                        authMock();
                        findProjectByNameMock(projectB);
                        findServiceByNameMock(null);
                    },
                },
                {
                    title: "should return an updated service with the new project given both the project & the service exist",
                    sendRequest: () => {
                        return supertest(app).put(
                            "/projects/ProjectB/services/httpd"
                        );
                    },
                    res: {
                        status: 200,
                        body: {
                            ...serviceA,
                            projectId: projectB.id,
                        },
                    },
                    mocks: () => {
                        authMock();
                        findProjectByNameMock(projectB);
                        findServiceByNameMock(serviceA);
                        updateServiceMock({
                            ...serviceA,
                            projectId: projectB.id,
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
});
