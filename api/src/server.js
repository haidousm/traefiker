const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport");

const connectDB = require("./config/db");
const setupPassport = require("./config/passport");

const authRouter = require("./routes/auth");
const servicesRouter = require("./routes/services");
const dockerRouter = require("./routes/docker");

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
app.use("/api/docker", dockerRouter);

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
