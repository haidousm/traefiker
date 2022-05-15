import config from "config";
import http from "http";

import logger from "./utils/logger";
import connectDB from "./utils/db";
import swaggerDocs from "./utils/swagger";
import createServer from "./utils/server";
import { io } from "./utils/socket";
import {
    useDBAsSourceOfTruth,
    useDockerAsSourceOfTruth,
} from "./utils/startup";

const app = createServer();
const httpServer = http.createServer(app);
io.attach(httpServer, {
    cors: {
        origin: "*",
    },
});
const port =
    config.get<number>("PORT") ||
    (process.env.PORT as unknown as number) ||
    8010;
httpServer.listen(port, async () => {
    logger.info(`Express server started on port ${port}`);
    await connectDB();

    if (config.get<boolean>("DOCKER_SOURCE_OF_TRUTH")) {
        logger.info("Using Docker as source of truth");
        await useDockerAsSourceOfTruth();
    } else {
        logger.info("Using DB as source of truth");
        await useDBAsSourceOfTruth();
    }
    swaggerDocs(app, port);
});
