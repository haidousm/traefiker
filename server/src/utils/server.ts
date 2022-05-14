import express from "express";
import routes from "../routes/routes";
import passport from "passport";
import configurePassport from "./passport";
import cors from "cors";

const createServer = () => {
    configurePassport(passport);

    const app = express();
    app.use(passport.initialize());
    app.use(express.json());
    app.use(
        cors({
            origin: "*",
        })
    );
    routes(app);
    return app;
};

export default createServer;
