const path = require('path');
const Dotenv = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, './public');
var APP_DIR = path.resolve(__dirname, './src');

module.exports = {
  // entry: path.resolve(__dirname, 'src', 'index.js'),
  entry: [
    "@babel/polyfill", APP_DIR + '/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/, loader: 'url-loader'
      }, 
      {
        test: /(\.css|.scss)$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  optimization: {
    // minimizer: [new UglifyJsPlugin({ sourceMap: true })],
    minimizer: [new UglifyJsPlugin()],
  },
  // devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      Actions: path.resolve(__dirname, 'src/actions/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Pages: path.resolve(__dirname, 'src/pages/'),
      Forms: path.resolve(__dirname, 'src/forms/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
    }
  },
  plugins: [
    new Dotenv({ systemvars: true })
  ]
}