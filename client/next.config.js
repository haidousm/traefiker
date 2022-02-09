/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: false,
    publicRuntimeConfig: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
};

const intercept = require("intercept-stdout");

// safely ignore recoil stdout warning messages
function interceptStdout(text) {
    if (text.includes("Duplicate atom key")) {
        return "";
    }
    return text;
}

// Intercept in dev and prod
intercept(interceptStdout);
