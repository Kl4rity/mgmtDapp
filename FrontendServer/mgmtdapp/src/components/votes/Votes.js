import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteCard from './VoteCard/VoteCard';

import {Col} from 'react-materialize';
import AddVoteModal from './AddVoteModal/AddVoteModal';
import roleUtils from '../utils/roleUtils';

class Votes extends Component {

  constructor({match}){
    super();
    this.match = match;
    this.displayVotesForId = this.displayVotesForId.bind(this);
    this.filterVotes = this.filterVotes.bind(this);
  }

  componentWillReceiveProps({match}){
    this.match = match;
  }

  displayVotesForId(id){
    let votes = this.filterVotes(id);
    let voteList = null;
    if(!!votes && votes.length > 0){
      voteList = votes.map((vote, index)=>{
         return <VoteCard vote={vote} key={index}/>
      });
    } else {
      voteList = <li>No votes to display</li>
    }
    return voteList;
  }

  filterMembers(id) {
    let organisationMembers = null;
    if (!!this.props.organisations && this.props.organisations.length > 0) {
      let currentOrganisation = this.props.organisations.filter(organisation => organisation.id == id)[0];
      organisationMembers = currentOrganisation.members;
    }
    return organisationMembers;
  }

  filterVotes(id){
    let organisationVotes = null;
    if(!!this.props.organisations && this.props.organisations.length > 0){
      let currentOrganisation = this.props.organisations.filter(organisation => organisation.id == id)[0];
      organisationVotes = currentOrganisation.votes;
    }
    return organisationVotes;
  }

  memberCanCreateNewVote(user, memberList, rolesList){
    let canCreateVote = false;
    let userRole = roleUtils.getRoleForUserInOrganisation(user, memberList, rolesList);
    if(!!userRole){
      canCreateVote = userRole.permissions.vote.create;
    }
    return canCreateVote;
  }

  render() {

    let addButton = null;
    if (this.memberCanCreateNewVote(this.props.user, this.filterMembers(this.match.params.id), this.props.roles)) {
      addButton = <AddVoteModal></AddVoteModal>;
    }

    return (
      <Col l={12} m={12} s={12}>
          {this.displayVotesForId(this.match.params.id)}
          {addButton}
      </Col>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    organisations : state.organisations,
    user : state.user,
    roles : state.roles
    }
}

export default connect(mapStateToProps)(Votes);
