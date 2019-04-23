import React from 'react'
import { Route, Redirect } from 'react-router'
import TopicList from '../views/TopicList'
import TopicDetail from '../views/TopicDetail'

export default () => [
  <Route path="/" render={() => <Redirect to="/topicList" />} exact key={0} />,
  <Route path="/detail" component={TopicDetail} key={1} />,
  <Route path="/topicList" component={TopicList} key={2} />,
]
