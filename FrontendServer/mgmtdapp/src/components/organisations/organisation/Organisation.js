import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Votes from '../../votes/Votes';

import Page404 from '../../common/404';
import Members from '../../members/Members';

export class Organisation extends Component {
  render() {
    return (
      <div>
        This is an organisation.
        <BrowserRouter basename="/organisation/">
          <Switch>
            <Route path="/votes" component={Votes}/>
            <Route path="/members" component={Members}/>
            <Route path="" exact/>
            <Route component = {Page404}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default Organisation
