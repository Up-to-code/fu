import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production Optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Experimental Features for Performance
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'date-fns', 
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
      'recharts'
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/dashboard/products/:path*",
        destination: "/products/:path*",
        permanent: true,
      },
      {
        source: "/dashboard/orders/:path*",
        destination: "/orders/:path*",
        permanent: true,
      },
      {
        source: "/dashboard/categories/:path*",
        destination: "/categories/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
