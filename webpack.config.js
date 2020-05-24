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
            test: /\.(png|svg|jpg|gif)$/,
            use: 'file-loader'
        },
        {
            test: /\.(wott|wott2|ttf|otf)$/,
            use: 'file-loader'
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
        
        new HtmlWebpackPugPlugin(),

        new WebpackMd5Hash()
    ],
}