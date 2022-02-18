const fs = require("fs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const PRIV_KEY = fs.readFileSync(`${__dirname}/../config/keys/private.pem`);

const validatePassword = (password, hash, salt) => {
    const hashPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

    return hashPassword === hash;
};

const generateSalt = () => {
    return crypto.randomBytes(16).toString("hex");
};

const generateHash = (password, salt) => {
    return crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
};

const issueJWT = (user) => {
    const expiresIn = "1y";
    const payload = {
        sub: user.id,
        iat: new Date().getTime(),
    };
    const token = jwt.sign(payload, PRIV_KEY, {
        expiresIn,
        algorithm: "RS256",
    });
    return {
        token: `Bearer ${token}`,
        expires: expiresIn,
    };
};

module.exports = { validatePassword, generateSalt, generateHash, issueJWT };
