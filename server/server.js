const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const serverEntry = require('../dist/server-entry').default

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

const app = express()

app.use('/public',express.static(path.join(__dirname,'../dist')))

app.get('*',(req,res)=>{
  const appString = ReactSSR.renderToString(serverEntry)
res.send(template.replace('<div id="root"></div>',`<div id="root">${appString}</div>`))
})

app.listen(3333,()=>{
  console.log(('server is listening on port 3333'))
})
