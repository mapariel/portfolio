const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 



module.exports = (env) =>{

 // in development mode 
if (env.BASE_URL){
  return {
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
          BASE_URL: JSON.stringify(env.BASE_URL),
          BASE_API: JSON.stringify(env.BASE_API),
        },
        )
    ]
};


}

 // in production mode 

return {
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
          BASE_URL: JSON.stringify(process.env.BASE_URL),
          BASE_API: JSON.stringify(process.env.BASE_API),
        },
        )
    ]
};
}



