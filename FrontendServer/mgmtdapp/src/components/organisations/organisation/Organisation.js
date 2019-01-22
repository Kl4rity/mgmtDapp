import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Col} from 'react-materialize';
import './Organisation.css';

export class Organisation extends Component {

  constructor({ match }) {
    super();
    this.match = match;
    this.id = match.params.id;
    // this.displayOrganisation = this.displayOrganisation.bind(this);
    this.displaySwitchLinks = this.displaySwitchLinks.bind(this);
  }

  componentWillReceiveProps({ match }) {
    this.match = match;
  }

  displaySwitchLinks() {
    return <Col s={12} m={12} l={12}>
    <ul className="pagination center">
      <li><NavLink activeClassName='display-switch-active' to={`${this.match.url}/votes/`}>Votes</NavLink></li>
      <li className='display-switch-separator'>|</li>
      <li><NavLink activeClassName='display-switch-active' to={`${this.match.url}/members/`}>Members</NavLink></li>
    </ul>
    </Col>
  }

  render() {
    return (
      <Row className='organisation-row'>
        {/* {this.displayOrganisation(this.match.params.id)} */}
        {this.displaySwitchLinks()}
      </Row>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    organisations: state.organisations
  }
}

export default connect(mapStateToProps)(Organisation);
