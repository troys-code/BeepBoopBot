const webpack = require('webpack')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'production';

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  })
];

if (NODE_ENV !== 'development') {
  const minifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  });
  plugins.push(minifyPlugin);
}

module.exports = {
  entry: [
    './index.js' // Your appʼs entry point
  ],
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: __dirname
      }
    ]
  },
  devServer: {
    contentBase: '../public'
  },
  plugins,
}
