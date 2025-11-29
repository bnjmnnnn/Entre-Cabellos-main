/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Set basePath for GitHub Pages deployment
  // Uncomment the line below if deploying to a subpath (e.g., /Entre-Cabellos-main)
  // basePath: '/Entre-Cabellos-main',
}

export default nextConfig
