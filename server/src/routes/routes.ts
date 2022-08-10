import { Express, Request, Response } from "express";
import { protectRoute } from "../middleware/protectRoute";

import authRouter from "./auth.route";
import servicesRouter from "./services.route";
// import projectsRouter from "./projects.route";

const routes = (app: Express) => {
    app.get("/health", (_req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.use("/auth", authRouter);
    app.use("/services", protectRoute, servicesRouter);
    // app.use("/projects", protectRoute, projectsRouter);
};

export default routes;
