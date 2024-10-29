const Dotenv = require('dotenv-webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
  
    // Other webpack configuration options...
        entry: "./src/index.js",
        target: "web",
        mode: "development",
        output: {
          path: path.resolve(__dirname, "build"),
          filename: "bundle.js",
        },
        resolve: {
          extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        },
        module: {
        optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
        ],
      },
      rules: [
        // Other rules...
        {
         test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/', // Output directory for the images
              },
            },
          ],
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        {
          test: /\.css$/,
          loader: "css-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "./src/index.css",
      }),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(packageJson.version),
      }),
    ],
  };
    