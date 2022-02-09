const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");

const connectDB = require("./config/db");
const setupPassport = require("./config/passport");

const { useDockerAsSourceOfTruth } = require("./utils/startup");

dotenv.config({
    path: path.resolve(__dirname, "./config/config.env"),
});

connectDB();
setupPassport(passport);
(async () => await useDockerAsSourceOfTruth())();

const app = express();
app.use(
    cors({
        origin: "*",
    })
);

app.use(passport.initialize());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

// app.use(passport.authenticate("jwt", { session: false }));
app.use("/api/services", require("./routes/services"));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
