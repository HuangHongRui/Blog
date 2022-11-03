const { src, path, dist, public } = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(src, "index.tsx"),
  output: {
    path: dist,
    filename: "bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(public, "index.html"),
      favicon: path.resolve(public, "logo.ico"),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      }
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
};
