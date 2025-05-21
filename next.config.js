// next.config.js
/** @type {import('next').NextConfig} */
const redirectsList = require("./redirects.json");

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cms-matteo.barques.dev",
                pathname: "**",
            },
        ],
    },
    async redirects() {
        return redirectsList;
    },
};

module.exports = nextConfig;
