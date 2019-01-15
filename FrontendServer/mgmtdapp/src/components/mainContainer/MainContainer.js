import React, { Component } from 'react';
import BlankHomePage from '../common/BlankHomePage';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Organisation from '../organisations/organisation/Organisation';
import Page404 from '../common/404';
import Navbar from '../common/Navbar';
import Organisations from '../organisations/Organisations';

export class MainContainer extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Organisations/>
        <BrowserRouter>
          <Switch>
            <Route path="/organisation" component={Organisation}/>
            <Route path="/" exact component={BlankHomePage}/>
            <Route component = {Page404}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default MainContainer;
