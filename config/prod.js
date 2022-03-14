const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const base = require('./base');
const { path, entryFile, dist, public } = require("./paths");

module.exports = merge(base, {
  mode: "production",
  devtool: false,

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(public, "index.html"),
      favicon: path.resolve(public, "logo.ico"),
    }),
  ],
});
