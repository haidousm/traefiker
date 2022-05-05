import config from "config";

import logger from "./utils/logger";
import connectDB from "./utils/db";
import swaggerDocs from "./utils/swagger";
import createServer from "./utils/server";

const app = createServer();
const port = config.get<number>("PORT") || 8010;
app.listen(port, async () => {
    logger.info(`Express server started on port ${port}`);
    await connectDB();
    swaggerDocs(app, port);
});
