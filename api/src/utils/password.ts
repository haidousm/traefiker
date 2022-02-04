import crypto from "crypto";

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

export { validatePassword, generateSalt, generateHash };
