import fs from "fs";
import crypto from "crypto";

const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
    privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
});

if (!fs.existsSync(`${__dirname}/../config/keys/`)) {
    fs.mkdirSync(`${__dirname}/../config/keys/`);
}

fs.writeFileSync(`${__dirname}/../config/keys/public.pem`, keyPair.publicKey);
fs.writeFileSync(`${__dirname}/../config/keys/private.pem`, keyPair.privateKey);
