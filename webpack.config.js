const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    },
    module: { 
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
        },{
            test: /\.pug/,
            use: [
              {
                loader: 'html-loader'},
              {
                loader: 'pug-html-loader',
                options: {
                  pretty: true
                }
              }],
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: 'file-loader'
        },
        {
            test: /\.(eot|woff|woff2|ttf|otf|svg)$/,
            use: {
              loader: 'file-loader',
              options: {
                name: "[name].[ext]",
                outputPath: 'fonts',
            },
          },
        },
        {
            test: /\.scss$/,
            use:  [
                'style-loader', 
                MiniCssExtractPlugin.loader, 
            {
                loader: 'css-loader',
                options: { sourceMap: true }
              }, 
              {
                loader: 'postcss-loader',
                options: { sourceMap: true, config: { path: './postcss.config.js' } }
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: true }
              }
            ]
        }
    ],
  },
    plugins: [ 
        new CleanWebpackPlugin(),
        
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: 'src/pages/index.pug',
        }),

        new HtmlWebpackPlugin({
          filename: "ui-kit-colors-types.html",
          template: 'src/pages/ui-kit-colors-types/ui-kit-colors-types.pug',
        }),

        new HtmlWebpackPlugin({
          filename: "ui-kit-form-elements.html",
          template: 'src/pages/ui-kit-form-elements/ui-kit-form-elements.pug',
        }),
        
        new HtmlWebpackPugPlugin(),

        new WebpackMd5Hash()
    ],
}