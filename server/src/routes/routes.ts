import { Express, Request, Response } from "express";

import authRouter from "./auth.route";
import servicesRouter from "./services.route";

const routes = (app: Express) => {
    app.get("/health", (_req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.use("/auth", authRouter);
    app.use("/services", servicesRouter);
};

export default routes;
