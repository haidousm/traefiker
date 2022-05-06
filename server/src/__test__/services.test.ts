/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from "supertest";
import createServer from "../utils/server";

import * as ServicesService from "../services/services.service";
import passport from "passport";
import { NextFunction, Request, Response } from "express";

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
                passport.authenticate = jest.fn(() => {
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
});
