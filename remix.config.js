/**
 * @type {import('@remix-run/dev').AppConfig}
 */

module.exports = {
  serverBuildTarget: process.env.VERCEL_ENV ? "vercel" : "node-cjs",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.VERCEL_ENV ? "./server.js" : undefined,
  ignoredRouteFiles: [".*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  // devServerPort: 8002
  serverDependenciesToBundle: ["@formkit/auto-animate/react"],
};
