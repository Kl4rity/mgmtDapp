import React, { Component } from 'react'
import { connect } from 'react-redux';

class Members extends Component {

  constructor({match}){
    super();
    this.match = match;
    this.displayMembersForId = this.displayMembersForId.bind(this);
    this.filterMembers = this.filterMembers.bind(this);
  }

  componentWillReceiveProps({match}){
    this.match = match;
  }

  displayMembersForId(id){
    let members = this.filterMembers(id);
    let memberList = null;
    if(!!members && members.length > 0){
      memberList = members.map((member, index)=>{
        return <li key={index}>{member.username}</li>
      });
    } else {
      return <li>No members to display.</li>
    }
    return memberList;
  }

  filterMembers(id){
    let organisationMembers = null;
    if(!!this.props.organisations && this.props.organisations.length > 0){
      let currentOrganisation = this.props.organisations.filter(organisation => organisation.id == id)[0];
      organisationMembers = currentOrganisation.members;
    }
    return organisationMembers;
  }

  render() {
    return (
      <div>
        <ul>
          {this.displayMembersForId(this.match.params.id)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    organisations : state.organisations
  }
}

export default connect(mapStateToProps)(Members);
