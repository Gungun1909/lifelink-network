/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'api.dicebear.com'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'LIFELINK',
    NEXT_PUBLIC_APP_TAGLINE: 'Connecting You to Care, When It Matters Most',
  },
}

module.exports = nextConfig
