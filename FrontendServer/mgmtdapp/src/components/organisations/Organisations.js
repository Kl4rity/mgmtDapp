import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {SideNav, SideNavItem, Button} from 'react-materialize';
import './Organisations.css';

import AuthenticationButtons from '../common/AuthenticationButtons'
import AddOrganisationModal from './AddOrganisationModal/AddOrganisationModal';


class Organisations extends Component {

  organisationRow(organisation, index){
    return <SideNavItem key = {index}> <NavLink activeClassName='mgmt-dapp-organisation-active' className="no-padding" to={"/organisation/"+ organisation.id + "/votes/"}>{organisation.name} </NavLink></SideNavItem>;
  }
  render() {
    let organisations;
    if (this.props.organisations){
      organisations = this.props.organisations.map(this.organisationRow);
    } else {
      organisations = <SideNavItem>No organisations yet. Create one!</SideNavItem>;
    }

    return (
      <SideNav fixed id="nav-mobile">
          <SideNavItem subheader>Organisations</SideNavItem>
          {organisations}
          <AddOrganisationModal/>
          <AuthenticationButtons></AuthenticationButtons>
      </SideNav>
    )
  }
}

function mapStateToProps(state, ownProps){
    return {
        organisations: state.organisations
    }
}

Organisations.propTypes = {
  organisations: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Organisations);