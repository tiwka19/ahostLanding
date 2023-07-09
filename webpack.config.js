const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const outputFile = "[name].[chunkhash]";
const assetFile = "[name].[contenthash]";

module.exports = {
  mode: "development",
  entry: "./src/js/main",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${outputFile}.js`,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpe?g|gif|png|web(p|m)|svg|woff2?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: `assets/${assetFile}[ext]`,
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    hot: false,
    liveReload: true,
    static: {
      directory: path.resolve(__dirname, "dist"),
      watch: {
        ignored: /node_modules/,
      },
    },
    client: { progress: true },
    compress: true,
    port: 9000,
    open: true,
  },
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`,
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "src/logo.png"),
      favicons: {
        icons: {
          appleStartup: false,
          windows: false,
          yandex: false,
        },
      },
    }),
  ],
};
