import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();
describe("health check", () => {
    describe("given the server is healthy", () => {
        it("should return a 200", () => {
            return supertest(app).get("/health").expect(200);
        });
    });
});
