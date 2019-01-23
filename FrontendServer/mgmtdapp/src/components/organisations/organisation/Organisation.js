import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col } from 'react-materialize';
import './Organisation.css';
import { setIdExists } from '../../../actions/idExistsActions';

export class Organisation extends Component {

  constructor({ match, history }) {
    super();
    this.match = match;
    this.history = history;
    this.id = match.params.id;
    this.displaySwitchLinks = this.displaySwitchLinks.bind(this);
    this.idExists = this.idExists.bind(this);
  }

  componentWillReceiveProps({ match, history }) {
    this.match = match;
    this.history = history;
  }

  idExists() {
    let idExists = false;
    if (!!this.props && !!this.props.organisations && this.props.organisations.length > 0) {
      this.props.organisations.forEach((organisation) => {
        if (organisation.id == this.match.params.id) {
          idExists = true;
        }
      });
      this.props.setIdExists(idExists);
      return idExists;
    }
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

    let content = null;

    if (!this.idExists()) {
      content = <Redirect to="/404"></Redirect>
    } else {
      content = <Row className='organisation-row'>
        {this.displaySwitchLinks()}
      </Row>
    }

    return (
      content
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    organisations: state.organisations
  }
}

function mapDispatchToProps(dispatch){
  return {
    setIdExists : function(exists){
      dispatch(setIdExists(exists))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Organisation);
