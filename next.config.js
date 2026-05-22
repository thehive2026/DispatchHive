
# Generate next.config.js

next_config = """/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
};

module.exports = nextConfig;
"""

print("=" * 60)
print("FILE 5: next.config.js")
print("=" * 60)
print(next_config)
print()
print("NOTE: 'output: standalone' creates a self-contained build")
print("Perfect for DigitalOcean deployment")

