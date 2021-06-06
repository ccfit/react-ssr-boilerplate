const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.base.config.js");
function resolve(pathParams) {
  return path.join(__dirname, pathParams);
}
const mode = "production";
const clientConfig = {
  mode: mode,
  entry: resolve("../src/client/index.js"),
  target: "web",
  node: {
    fs: "empty",
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          "style-loader",
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

module.exports = merge(config, clientConfig);
