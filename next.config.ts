import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Specify the correct root directory to avoid lockfile conflicts
  turbopack: {
    root: __dirname,
  },
  
  // Disable React Compiler for now to prevent memory issues
  reactCompiler: false,
  
  // Configure experimental features for better memory management
  experimental: {
    optimizePackageImports: ['@tanstack/react-query', 'lucide-react'],
  },
  
  // Configure webpack for better memory management
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
