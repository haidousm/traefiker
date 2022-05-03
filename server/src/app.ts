import express from "express";
import config from "config";

const app = express();
const port = config.get<number>("PORT") || 8010;
app.listen(port, () => console.log(`Express server started on port ${port}`));
