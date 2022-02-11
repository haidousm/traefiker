const User = require("../models/User");
const { generateHash, generateSalt } = require("../utils/password");
const connectDB = require("./db");
const dotenv = require("dotenv");
const path = require("path");
const { exit } = require("process");

(async () => {
    dotenv.config({
        path: path.resolve(__dirname, "./config.env"),
    });

    connectDB();
    const salt = generateSalt();
    const hash = generateHash(process.env.ADMIN_PASSWORD, salt);
    const user = new User({
        username: process.env.ADMIN_USERNAME,
        hash,
        salt,
    });

    await user.save();
    exit();
})();
