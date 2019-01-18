import React, { Component } from 'react';
import BlankHomePage from '../common/BlankHomePage';

import { Route, Switch } from 'react-router-dom';
import Votes from '../votes/Votes'
import Page404 from '../common/404';
import Navbar from '../common/Navbar';
import Organisations from '../organisations/Organisations';
import {PropTypes} from 'prop-types';

import {connect} from 'react-redux';

import fetchDataServiceSingleton from '../../services/fetchDataService';
import Members from '../members/Members';

class MainContainer extends Component {

  constructor(props, context){
    super(props, context);
    const fetchDataService = fetchDataServiceSingleton.getFetchDataService();
    fetchDataService.fetchAllUserData();
  }
  render() {
    return (
      <div>
        <Navbar/>
        <Organisations/>
        <Switch>
          <Route path="/organisation/:id/votes/" component={Votes}/>
          <Route path="/organisation/:id/members/" component={Members}/>
          <Route path="/" exact component={BlankHomePage}/>
          <Route component = {Page404}/>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    user: state.user
  }
}

MainContainer.contextTypes = {
  store: PropTypes.object
};

export default connect(mapStateToProps)(MainContainer);
