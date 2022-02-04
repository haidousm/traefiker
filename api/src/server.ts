import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config({
    path: path.resolve(__dirname, "./config/config.env"),
});

connectDB();

const app = express();
app.get("/", (req, res) => {
    res.send("hi");
});

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
