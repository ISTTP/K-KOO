/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "src", "index.tsx"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|ttf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new Dotenv({
      path: "./.env",
    }),
  ],
};
