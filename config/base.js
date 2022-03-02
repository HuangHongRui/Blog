const { src, path, dist } = require("./paths");

module.exports = {
  entry: path.resolve(src, "index.tsx"),
  output: {
    path: dist,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
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
