const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "./dist"),
        publicPath: "./dist",
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/'
        },
        {
          test: /\.css$/,
          loader: ['style-loader','css-loader'],
        },
        {
            test: /\.(sass|scss)$/,
            loader: ['style-loader','css-loader', 'sass-loader']
        }
    ]
    },
}