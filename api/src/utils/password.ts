import fs from "fs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";

const PRIV_KEY = fs.readFileSync(`${__dirname}/../config/keys/private.pem`);

const validatePassword = (password: string, hash: string, salt: string) => {
    const hashPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

    return hashPassword === hash;
};

const generateSalt = () => {
    return crypto.randomBytes(16).toString("hex");
};

const generateHash = (password: string, salt: string) => {
    return crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
};

const issueJWT = (user: UserModel) => {
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

export { validatePassword, generateSalt, generateHash, issueJWT };
