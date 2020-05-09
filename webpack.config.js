const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, './public');
// var APP_DIR = path.resolve(__dirname, './src');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: './index.html',
  //     filename: './index.html'
  //   })
  // ]
}