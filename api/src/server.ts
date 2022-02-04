import express from "express";
import path from "path";
import dotenv from "dotenv";
import passport from "passport";

import connectDB from "./config/db";
import setupPassport from "./config/passport";

dotenv.config({
    path: path.resolve(__dirname, "./config/config.env"),
});

connectDB();
setupPassport(passport);

const app = express();
app.get("/", (_req, res) => {
    res.send("hi");
});

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
