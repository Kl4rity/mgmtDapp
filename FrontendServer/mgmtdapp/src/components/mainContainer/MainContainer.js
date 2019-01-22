import React, { Component } from 'react';
import BlankHomePage from '../common/BlankHomePage';

import { Route, Switch } from 'react-router-dom';
import Votes from '../votes/Votes'
import Page404 from '../common/404';
import Organisations from '../organisations/Organisations';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import fetchDataServiceSingleton from '../../services/fetchDataService';
import Members from '../members/Members';
import Organisation from '../organisations/organisation/Organisation';
import { Container, Navbar, Row, Col } from 'react-materialize';
import './MainContainer.css';

class MainContainer extends Component {

  constructor(props, context) {
    super(props, context);
    const fetchDataService = fetchDataServiceSingleton.getFetchDataService();
    fetchDataService.fetchAllUserData();
  }
  render() {
    return (
      <div>
        <Organisations />
        <Row className = 'mgmt-container'>
          <Col className='mgmt-container' s={0} m={0} l={3}></Col>
          <Col className='mgmt-container' s={12} m={12} l={9}>
            <Navbar brand="MGMT" />
          </Col>
        </Row>
          <Row>
            <Col s={0} m={0} l={3}></Col>
            <Col s={12} m={12} l={9}>
              <Route path="/organisation/:id/" component={Organisation} />
              <Switch>
                <Route path="/organisation/:id/votes/" component={Votes} />
                <Route path="/organisation/:id/members/" component={Members} />
                <Route path="/" exact component={BlankHomePage} />
                <Route component={Page404} />
              </Switch>
            </Col>
          </Row>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  }
}

MainContainer.contextTypes = {
  store: PropTypes.object
};

export default connect(mapStateToProps)(MainContainer);
