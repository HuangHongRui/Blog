const { merge } = require('webpack-merge');
const base = require('./base');
const { entryFile, dist, public } = require("./paths");

module.exports = merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    publicPath: "/",
  },
  devServer: {
    hot: true,
    port: 9000,
    static: dist,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
});




// /* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
// const path = require("path");
// const autoprefixer = require("autoprefixer");
// const tailwindcss = require("tailwindcss");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const paths = require("./paths");

// module.exports = {
//   mode: "development",
//   entry: path.resolve(paths.appSrc, "index.tsx"),
//   output: {
//     path: paths.appDist,
//     filename: "[name].bundle.js",
//     chunkFilename: "[name].bundle.js",
//     publicPath: "/",
//   },

//   optimization: {
//     splitChunks: {
//       chunks: "all",
//     },
//   },

//   resolve: {
//     extensions: [".tsx", ".ts", ".js", ".json"],
//     alias: {
//       utils: path.resolve(paths.appSrc, "utils"),
//       pages: path.resolve(paths.appSrc, "pages"),
//       style: path.resolve(paths.appSrc, "style"),
//       component: path.resolve(paths.appSrc, "component"),
//     },
//   },

//   module: {
//     rules: [
//       {
//         test: /\.ts(x?)$/,
//         use: ["awesome-typescript-loader"],
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.scss$/,
//         exclude: /node_modules/,
//         use: [
//           "style-loader",
//           { loader: "css-loader", options: { importLoaders: 2 } },
//           {
//             loader: "postcss-loader",
//             options: {
//               postcssOptions: {
//                 ident: "postcss",
//                 plugins: [tailwindcss("../tailwind.config.js"), autoprefixer],
//               },
//             },
//           },
//           "sass-loader",
//         ],
//       },
//       {
//         test: /\.svg$/,
//         exclude: path.resolve(paths.appSrc, "style/image"),
//         // issuer: {
//         // test: /\.ts(x)?$/,
//         // },
//         use: ["@svgr/webpack"],
//       },
//       {
//         test: /\.svg$/,
//         // issuer: {
//         // test: /\.ts(x)?$/,
//         // },
//         exclude: path.resolve(paths.appSrc, "style/icon"),
//         use: [
//           "@svgr/webpack",
//           {
//             loader: "svg-url-loader",
//             options: {
//               limit: 1000,
//               name: "[path][name].[ext]",
//             },
//           },
//         ],
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif)$/,
//         use: [
//           {
//             loader: "url-loader",
//             options: {
//               limit: 1000,
//               name: "[path][name].[ext]",
//             },
//           },
//         ],
//       },
//     ],
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(paths.appPublic, "index.html"),
//       favicon: path.resolve(paths.appPublic, "logo.ico"),
//     }),
//   ],

//   devServer: {
//     contentBase: paths.appPublic,
//     // 解决问题: 本地开发路由刷新 404
//     historyApiFallback: true,
//     watchContentBase: true,
//     hot: true,
//     port: 9000,
//   },
// };
