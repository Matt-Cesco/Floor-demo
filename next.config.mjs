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
        qualities: [25, 50, 75, 100],
    },
};

export default nextConfig;
