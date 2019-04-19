const path = require('path')
const Merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

const config ={
  target: "node", // 编译的文件使用的环境
  entry:{
    app: path.join(__dirname,'../client/server-entry.js')
  },
  output : {
    filename: "server-entry.js",
    libraryTarget: "commonjs2" // 打包的文件使用的模块方案
  }
}

module.exports = Merge(baseConfig,config)
