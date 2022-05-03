import { Express, Request, Response } from "express";

const routes = (app: Express) => {
    app.get("/health", (_req: Request, res: Response) => {
        res.sendStatus(200);
    });
};

export default routes;
