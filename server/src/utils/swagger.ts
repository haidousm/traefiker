import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import logger from "./logger";

const options: swaggerJsdoc.OAS3Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Traefiker API",
            version,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        servers: [
            {
                url: "https://moussa.sh/api",
                description: "Production Server",
            },
            {
                url: "http://localhost:8010",
                description: "Localhost",
            },
        ],
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/schemas/*.ts", "./src/types/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Express, port: number) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/docs.json", (_req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    logger.info(`Swagger docs available at http://localhost:${port}/docs`);
};

export default swaggerDocs;
