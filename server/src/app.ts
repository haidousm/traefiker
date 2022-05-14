import config from "config";
import http from "http";

import logger from "./utils/logger";
import connectDB from "./utils/db";
import swaggerDocs from "./utils/swagger";
import createServer from "./utils/server";
import { io } from "./utils/socket";
import { useDockerAsSourceOfTruth } from "./utils/startup";

const app = createServer();
const httpServer = http.createServer(app);
io.attach(httpServer, {
    cors: {
        origin: "*",
    },
});
const port = config.get<number>("PORT") || 8010;
httpServer.listen(port, async () => {
    logger.info(`Express server started on port ${port}`);
    await connectDB();

    logger.info("Using Docker as source of truth");
    await useDockerAsSourceOfTruth();
    swaggerDocs(app, port);
});
