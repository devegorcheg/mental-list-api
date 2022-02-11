/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  target: "node",
  mode: "production",
  devtool: "source-map",
  entry: path.resolve(__dirname, "./src/index.ts"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              rootMode: "upward",
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      regeneratorRuntime: "regenerator-runtime/runtime",
    }),
  ],
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".jsx"],
    modules: ["node_modules"],
    plugins: [new TsconfigPathsPlugin({ extensions: [".ts", ".tsx", ".js"] })],
  },
};
