/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
