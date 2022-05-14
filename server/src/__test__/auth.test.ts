/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from "supertest";
import createServer from "../utils/server";
import * as UserService from "../services/user.service";
import * as PasswordUtils from "../utils/password";
import mongoose from "mongoose";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const validLoginCredentials = {
    username: "test-user",
    password: "123456",
};

const invalidLoginCredentials = {
    username: "test-user",
    password: "123455",
};

const userDoesNotExistCredentials = {
    username: "test-user1",
    password: "123456",
};

const invalidLoginPayload = {
    userName: "test-user",
    password: "123456",
};

const userPayload = {
    _id: userId,
    username: validLoginCredentials.username,
    hash: "hash",
    salt: "salt",
};

const tokenPayload = {
    token: "Bearer abcdefghijklmnopqrstuvwxyz",
    expires: "1y",
};

describe("auth", () => {
    describe("user login", () => {
        describe("given the username and password are correct", () => {
            it("should return the bearer token", async () => {
                jest.spyOn(UserService, "findUser")
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);

                jest.spyOn(
                    PasswordUtils,
                    "validatePassword"
                ).mockReturnValueOnce(true);

                jest.spyOn(PasswordUtils, "issueJWT").mockReturnValueOnce(
                    tokenPayload
                );

                const { statusCode, body } = await supertest(app)
                    .post("/auth/login")
                    .send(validLoginCredentials);

                expect(statusCode).toBe(200);
                expect(body).toEqual(tokenPayload);
            });
        });
        describe("given the username does not exist", () => {
            it("it should return a 400", async () => {
                jest.spyOn(UserService, "findUser")
                    // @ts-ignore
                    .mockReturnValueOnce(null);

                const { statusCode } = await supertest(app)
                    .post("/auth/login")
                    .send(userDoesNotExistCredentials);

                expect(statusCode).toBe(400);
            });
        });
        describe("given the credentials are incorrect", () => {
            it("it should return a 400", async () => {
                jest.spyOn(UserService, "findUser")
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);

                const validatePassword = jest
                    .spyOn(PasswordUtils, "validatePassword")
                    .mockReturnValueOnce(false);

                const { statusCode } = await supertest(app)
                    .post("/auth/login")
                    .send(invalidLoginCredentials);

                expect(statusCode).toBe(400);
                expect(validatePassword).toHaveBeenCalledWith(
                    invalidLoginCredentials.password,
                    userPayload.hash,
                    userPayload.salt
                );
            });
        });

        describe("given the login payload is invalid", () => {
            it("should return a 400", async () => {
                const { statusCode } = await supertest(app)
                    .post("/auth/login")
                    .send(invalidLoginPayload);

                expect(statusCode).toBe(400);
            });
        });
    });
});
