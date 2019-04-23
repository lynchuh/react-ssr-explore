const webpack = require('webpack')
const Merge = require('webpack-merge')
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.conf')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: {
    app: path.join(__dirname, '../client/index.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlPlugin({ template: path.join(__dirname, '../client/template.html') })
  ]
}

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/index.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 可以用任何形式访问
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      error: true
    },
    publicPath: '/public/', // 访问所有路径前缀都要加上/public
    historyApiFallback: { // 当访问index的时候，访问的路径改为/public/index.html
      index: '/public/index.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = Merge(baseConfig, config)
