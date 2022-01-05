const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build")
      },  
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ]
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", 
          }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
          //BASE_API: JSON.stringify('http://localhost:9090/api/'),
          //BASE_URL: JSON.stringify('http://localhost:9091/'),
          BASE_API: JSON.stringify('http://academie.my-wan.de/api/'),
          BASE_URL: JSON.stringify('http://academie.my-wan.de/'),

        },
        )
    ]
};



