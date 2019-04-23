// hack的开发方法 只适用开发的环境
// 开发环境下 server端需要拿到 html的模板 还有 server-entry.js 来渲染成html字符串并插入到html模板中
// html模板通过http请求到client端架起的dev-server中获取
// server-entry.js 通过webpack编译打包成一个模块来获取。

const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.server.conf')
let serverBundle

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html').then(res => {
      resolve(res.data)
    }).catch(reject)
  })
}
const Module = module.constructor
const mfs = new MemoryFs()

// webpack的API 在node环境里打包文件并输出到内存里
const serverCompiler = webpack(serverConfig)

serverCompiler.outputFileSystem = mfs // 将编译的文件写入内存中
serverCompiler.watch({}, (error, status) => { // stats 是webpack打包时输出的信息
  if (error) throw error
  status = status.toJson()
  status.errors.forEach(err => console.error(err))
  status.warnings.forEach(warn => console.warn(warn))
  console.log('update in dev server')
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js') // 将webpack打包的字符串转化为模块
  serverBundle = m.exports.default
})

module.exports = function (app) {
  // const template
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', (req, res) => {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!--app-->', content))
    })
  })
}
