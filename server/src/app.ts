import express from "express";
import config from "config";

import logger from "./utils/logger";
import connectDB from "./utils/db";
import routes from "./routes/routes";

const app = express();
const port = config.get<number>("PORT") || 8010;
app.listen(port, async () => {
    logger.info(`Express server started on port ${port}`);
    await connectDB();

    routes(app);
});
