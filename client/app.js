import ReactDom from 'react-dom'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import App from './app.jsx'

console.log('client work')

const root = document.getElementById('root')
const render = (Component)=>{
  ReactDom.hydrate(
    <AppContainer>
      <Component/>
    </AppContainer>,
    root
  )
}

render(App)

if(module.hot){
  module.hot.accept('./app.jsx',()=>{
    const NextApp =require('./app.jsx').default
    render(NextApp)
  })
}
