const webpack = require('webpack')
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV = 'development'

const config ={
  entry:{
    app: path.join(__dirname,'../client/app.js')
  },
  output: {
    filename: "[name].[hash].js",
    path: path.join(__dirname,'../dist'),
    publicPath: "/public/"  // 静态资源引用时的路径 如果是cdn部署静态资源的话，直接写成cdn的路径即可。
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname,'../node_modules')
        ]
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      template: path.join(__dirname,'../client/template.html')
    })
  ]
}

if(isDev){
  config.entry={
    app:[
      'react-hot-loader/patch',
      path.join(__dirname,'../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 可以用任何形式访问
    port: '8888',
    contentBase: path.join(__dirname,'../dist'),
    hot: true,
    overlay:{
      error: true
    },
    publicPath:'/public/', // 访问所有路径前缀都要加上/public
    historyApiFallback:{ // 当访问index的时候，访问的路径改为/public/index.html
      index: '/public/index.html'
    },
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
