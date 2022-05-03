import { Express, Request, Response } from "express";

import authRouter from "./auth";

const routes = (app: Express) => {
    app.get("/health", (_req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.use("/auth", authRouter);
};

export default routes;
