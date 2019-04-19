import ReactDom from 'react-dom'
import React from 'react'
import App from './app.jsx'

console.log('client work')

ReactDom.hydrate(<App />,document.getElementById('root'))
