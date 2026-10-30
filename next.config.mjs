import os from "os";

const localIps = Object.values(os.networkInterfaces())
  .flat()
  .filter((item) => item && item.family === "IPv4")
  .map((item) => item.address);

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    ...new Set(["localhost", "192.168.100.174", ...localIps]),
  ],
};

export default nextConfig;
