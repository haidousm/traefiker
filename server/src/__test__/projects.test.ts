/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from "supertest";
import createServer from "../utils/server";
import passport from "passport";

import * as ProjectsService from "../services/projects.service";
import * as ServicesService from "../services/services.service";

import { NextFunction, Request, Response } from "express";
import { Project } from "../types/Project";
import { Service } from "../types/Service";
import { Image } from "../types/Image";
import { ServiceStatus } from "../types/enums/ServiceStatus";

const mockProject: Project = {
    id: "1249124912",
    name: "default",
};

const mockImage: Image = {
    id: "5312949241",
    name: "httpd",
    tag: "latest",
    repository: "haidousm/httpd",
};

const mockService: Service = {
    name: "httpd",
    status: ServiceStatus.PULLING,
    image: mockImage,
    hosts: ["httpd.haidousm.com"],
    redirects: [],
    environmentVariables: [],
    order: 1,
    project: mockProject,
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
            beforeEach(() => {
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
            });

            it("should return all projects", async () => {
                jest.spyOn(ProjectsService, "findAllProjects")
                    // @ts-ignore
                    .mockReturnValueOnce([mockProject]);

                const response = await supertest(app).get("/projects");
                expect(response.statusCode).toBe(200);
                expect(response.body).toStrictEqual([mockProject]);
            });
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
            beforeEach(() => {
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
            });
            describe("given the project exists", () => {
                it("should return all services for project", async () => {
                    jest.spyOn(ProjectsService, "findProjectByName")
                        // @ts-ignore
                        .mockReturnValueOnce(mockProject);
                    jest.spyOn(ServicesService, "findServicesByProjectId")
                        // @ts-ignore
                        .mockReturnValueOnce([mockService]);
                    const response = await supertest(app).get(
                        "/projects/default/services"
                    );
                    expect(response.statusCode).toBe(200);
                    expect(response.body).toStrictEqual([mockService]);
                });
            });
            describe("given the project does not exist", () => {
                it("should return 404", async () => {
                    jest.spyOn(ProjectsService, "findProjectByName")
                        // @ts-ignore
                        .mockReturnValueOnce(null);
                    const response = await supertest(app).get(
                        "/projects/default/services"
                    );
                    expect(response.statusCode).toBe(404);
                });
            });
            describe("given the something throws", () => {
                it("should return 500", async () => {
                    jest.spyOn(ProjectsService, "findProjectByName")
                        // @ts-ignore
                        .mockImplementationOnce(() => {
                            throw new Error("oopsie daisie");
                        });
                    const response = await supertest(app).get(
                        "/projects/default/services"
                    );
                    expect(response.statusCode).toBe(500);
                });
            });
        });
    });
});
