const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports={
  entry:{
    app: path.join(__dirname,'../client/app.js')
  },
  output: {
    filename: "[name].[hash].js",
    path: path.join(__dirname,'../dist'),
    publicPath: "/public"  // 静态资源引用时的路径 如果是cdn部署静态资源的话，直接写成cdn的路径即可。
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
};
