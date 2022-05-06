/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from "supertest";
import createServer from "../utils/server";

import * as ServicesService from "../services/services.service";

const app = createServer();

describe("services", () => {
    describe("get all services", () => {
        it("should return all services", async () => {
            jest.spyOn(ServicesService, "findAllServices")
                // @ts-ignore
                .mockReturnValueOnce([]);

            const response = await supertest(app).get("/services/");
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
});
