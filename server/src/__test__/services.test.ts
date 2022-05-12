/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from "supertest";
import createServer from "../utils/server";

import * as ServicesService from "../services/services.service";
import * as DockerLib from "../../libs/docker";
import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { CreateServiceRequest } from "../schemas/services.schema";

const createServiceRequest: CreateServiceRequest = {
    name: "httpd",
    image: "httpd",
    hosts: ["httpd.haidousm.com"],
};

const createdService = {
    name: "httpd",
    status: "pulling",
    image: {
        name: "httpd",
        tag: "latest",
        repository: "haidousm/httpd",
        identifier: "haidousm/httpd:latest",
        createdAt: new Date().toString(),
    },
    hosts: ["httpd.haidousm.com"],
    redirects: [],
    environments: [],
    order: 0,
    tag: "traefiker_httpd",
    containerId: "",
    createdAt: new Date().toString(),
};

const createdContainer = {
    id: "12345",
};

const app = createServer();

describe("services", () => {
    describe("get all services", () => {
        describe("when user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app).get("/services");
                expect(response.status).toBe(401);
            });
        });
        describe("when user is logged in", () => {
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
                    .mockReturnValueOnce([]);

                const response = await supertest(app).get("/services");
                expect(response.status).toBe(200);
                expect(response.body).toEqual([]);
            });
        });
    });
    describe("create new service", () => {
        describe("when user is not logged in", () => {
            it("should return 401", async () => {
                const response = await supertest(app)
                    .post("/services/create")
                    .send(createServiceRequest);
                expect(response.status).toBe(401);
            });
        });
        describe("when user is logged in", () => {
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

                jest.spyOn(ServicesService, "createService")
                    // @ts-ignore
                    .mockReturnValueOnce(createdService);

                jest.spyOn(DockerLib, "createContainer")
                    //@ts-ignore
                    .mockReturnValueOnce(createdContainer);

                jest.spyOn(ServicesService, "attachContainerToService")
                    //@ts-ignore
                    .mockImplementationOnce(() => {
                        createdService.containerId = createdContainer.id;
                        createdService.status = "created";
                        return createdService;
                    });

                const response = await supertest(app)
                    .post("/services/create")
                    .send(createServiceRequest);
                expect(response.status).toBe(200);
                expect(response.body).toEqual(createdService);
            });
        });
    });
});
