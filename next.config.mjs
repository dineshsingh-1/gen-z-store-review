/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
};

if (!process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "[BUILD ERROR] NEXT_PUBLIC_GOOGLE_REVIEW_URL is not set. Set it in .env or the environment."
  );
  process.exit(1);
}

export default nextConfig;
