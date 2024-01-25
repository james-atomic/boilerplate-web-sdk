const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { generateKey } = require("./src/util/generate-jwt.js");
const atomicConfig = require("./src/config/atomicConfig.js")

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    open: true,
    onBeforeSetupMiddleware: (devServer) => {
      // Generate the config object (including JWT) when requested, and inline it with JS
      devServer.app.get("/config.js", async (req, res) => {
        try {
          const token = await generateKey(
            atomicConfig.userId,
            atomicConfig.apiKey,
            atomicConfig.issuer,
          );
          res.set("Content-Type", "application/javascript");
          res.send(
            `// This file is generated in webpack.config.js and does not exist on the filesystem
          window.AtomicConfig = {
            jwt: "${token}",
            apiHost: "${atomicConfig.apiHost}",
            streamContainerId: "${atomicConfig.streamContainerId}",
            apiKey: "${atomicConfig.apiKey}",
            environmentId: "${atomicConfig.environmentId}",
          };`
          );
        } catch (e) {
          console.error(
            "*** Error creating auth token" +
              e
          );
          res.status(500);
        }
      });
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
