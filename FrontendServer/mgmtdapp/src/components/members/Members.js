import React, { Component } from 'react'
import MemberCard from './memberCard/memberCard';
import { connect } from 'react-redux';
import { Col } from 'react-materialize';
import AddMemberModal from './AddMemberModal/AddMemberModal';

class Members extends Component {

  constructor({ match }) {
    super();
    this.match = match;
    this.displayMembersForId = this.displayMembersForId.bind(this);
    this.filterMembers = this.filterMembers.bind(this);
  }

  componentWillReceiveProps({ match }) {
    this.match = match;
  }

  displayMembersForId(id) {
    let members = this.filterMembers(id);
    let memberList = null;
    if (!!members && members.length > 0) {
      memberList = members.map((member, index) => {
        return <MemberCard key={index} member={member} />
      });
    } else {
      return <li>No members to display.</li>
    }
    return memberList;
  }

  filterMembers(id) {
    let organisationMembers = null;
    if (!!this.props.organisations && this.props.organisations.length > 0) {
      let currentOrganisation = this.props.organisations.filter(organisation => organisation.id == id)[0];
      organisationMembers = currentOrganisation.members;
    }
    return organisationMembers;
  }

  render() {

    let content = null;

    if (this.props.idExists) {
      content = <Col s={12} m={12} l={12}>
        {this.displayMembersForId(this.match.params.id)}
        <AddMemberModal organisationId={this.match.params.id} user={this.props.user} memberList={this.filterMembers(this.match.params.id)} roles={this.props.roles}></AddMemberModal>
      </Col>
    }

    return (
      content
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    organisations: state.organisations,
    roles: state.roles,
    user: state.user,
    idExists: state.idExists
  }
}

export default connect(mapStateToProps)(Members);
