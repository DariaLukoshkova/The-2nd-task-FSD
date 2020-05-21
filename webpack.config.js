const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: '/node_modules/',
            use: {
            loader: 'babel-loader',
          }
        },
        {
            test: /\.scss$/,
            use:  [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
        },
        {
            test: /\.(woff2|woff|ttf|eot|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            },
        },
        {
            test: /\.pug$/,
            loader: 'pug-loader'
        },
    ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/main/index.pug',
            filename: 'bundle.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/ui-kit/colors-and-types.pug',
            filename: 'colors-and-types.html'
        }),
        new MiniCssExtractPlugin({
          filename: "bundle.css",
        })
      ],
}