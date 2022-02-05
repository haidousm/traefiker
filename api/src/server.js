const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");

const connectDB = require("./config/db");
const setupPassport = require("./config/passport");

const { io } = require("./config/socket");

dotenv.config({
    path: path.resolve(__dirname, "./config/config.env"),
});

connectDB();
setupPassport(passport);

const app = express();
app.use(
    cors({
        origin: "*",
    })
);

app.use(passport.initialize());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.use(passport.authenticate("jwt", { session: false }));
app.use("/api/services", require("./routes/services"));

const http = require("http");
const server = http.createServer(app);
io.attach(server, {
    cors: {
        origin: "*",
    },
});

const port = 8080;
server.listen(port, () => console.log(`Server started on port ${port}`));
