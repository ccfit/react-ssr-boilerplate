const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");
function resolve(pathParams) {
  return path.join(__dirname, pathParams);
}

const mode = "production";
const serverConfig = {
  target: "node",
  mode: mode,
  entry: resolve("../src/server/index.js") ,
  output: {
    filename: "bundle.js",
    path: resolve("../dist"),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]_[local]_[hash:base64:5]",
            },
          },
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)?$/,
        loader: "url-loader",
        options: {
          limit: 4096,
          fallback: {
            loader: "file-loader",
            options: {
              name: "static/img/[name].[hash:8].[ext]",
            },
          },
        },
      },
    ],
  },
};

module.exports = merge(baseConfig, serverConfig);
