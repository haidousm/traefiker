const fs = require("fs");
const crypto = require("crypto");

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

if (!fs.existsSync(`${__dirname}/keys/`)) {
    fs.mkdirSync(`${__dirname}/keys/`);
}

fs.writeFileSync(`${__dirname}/keys/public.pem`, keyPair.publicKey);
fs.writeFileSync(`${__dirname}/keys/private.pem`, keyPair.privateKey);
