const path = require('path')

module.exports={
  target: "node", // 编译的文件使用的环境
  entry:{
    app: path.join(__dirname,'../client/server-entry.js')
  },
  output: {
    filename: "server-entry.js",
    path: path.join(__dirname,'../dist'),
    publicPath: "/public/",  // 静态资源引用时的路径 如果是cdn部署静态资源的话，直接写成cdn的路径即可。
    libraryTarget: "commonjs2" // 打包的文件使用的模块方案
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
  }
};
