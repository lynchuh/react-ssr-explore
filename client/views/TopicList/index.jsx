import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/appState'


@inject('appState') @observer

class TopicList extends React.Component {
  render() {
    return (
      <div>
        { this.props.appState.msg }
      </div>
    )
  }
}
TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}
export default TopicList
