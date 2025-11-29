/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: process.env.GITHUB_PAGES === 'true' ? '/Entre-Cabellos-main' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/Entre-Cabellos-main/' : '',
}

export default nextConfig
