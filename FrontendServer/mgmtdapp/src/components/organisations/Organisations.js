import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SideNav, SideNavItem, Button } from 'react-materialize';
import './Organisations.css';

import AuthenticationButtons from '../common/AuthenticationButtons'
import AddOrganisationModal from './AddOrganisationModal/AddOrganisationModal';
import DeleteOrganisation from './DeleteOrganisation/DeleteOrganisation';


class Organisations extends Component {

  constructor(props){
    super(props);
    this.organisationRow = this.organisationRow.bind(this);
  }

  organisationRow(organisation, index) {
    return <SideNavItem key={index}>
    <Link 
    className="no-padding"
    to={"/organisation/" + organisation.id + "/votes/"}>
          {organisation.name}
          <DeleteOrganisation user={this.props.user} memberList={organisation.members} roles = {this.props.roles} organisationId={organisation.id}></DeleteOrganisation>
          </Link>
    </SideNavItem>;
  }

  render() {
    let organisations;
    if (this.props.organisations) {
      organisations = this.props.organisations.map(this.organisationRow);
    } else {
      organisations = <SideNavItem>No organisations yet. Create one!</SideNavItem>;
    }

    return (
      <SideNav fixed id="nav-mobile">
        <SideNavItem subheader>Organisations</SideNavItem>
        {organisations}
        <AddOrganisationModal />
        <AuthenticationButtons></AuthenticationButtons>
      </SideNav>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    organisations: state.organisations,
    user : state.user,
    roles : state.roles
  }
}

Organisations.propTypes = {
  organisations: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Organisations);