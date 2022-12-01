/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
const intercept = require("intercept-stdout");
function interceptStdout(text) {
  if (
    text.includes("Duplicate atom key") ||
    text.includes("Fast Refresh had to perform a full reload")
  ) {
    return "";
  }
  return text;
}
intercept(interceptStdout);

module.exports = nextConfig;
