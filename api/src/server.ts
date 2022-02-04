import express from "express";
import path from "path";
import dotenv from "dotenv";
import passport from "passport";

import connectDB from "./config/db";
import setupPassport from "./config/passport";

import authRouter from "./routes/auth";
import servicesRouter from "./routes/services";

dotenv.config({
    path: path.resolve(__dirname, "./config/config.env"),
});

connectDB();
setupPassport(passport);

const app = express();

app.use(passport.initialize());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use(passport.authenticate("jwt", { session: false }));
app.use("/api/services", servicesRouter);

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
