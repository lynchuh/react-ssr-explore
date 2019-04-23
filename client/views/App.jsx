import React, { Fragment } from 'react'
import Routes from '../config/router'

export default class App extends React.PureComponent {
  componentDidMount() {
    // do something
  }

  render() {
    return (
      <Fragment>
        <Routes />
      </Fragment>
    )
  }
}
