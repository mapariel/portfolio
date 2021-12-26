const path = require("path");
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
        new CleanWebpackPlugin()
    ]
};



