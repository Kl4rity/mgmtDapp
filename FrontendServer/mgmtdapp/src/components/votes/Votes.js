import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteCard from './VoteCard/VoteCard';

import { Col } from 'react-materialize';
import AddVoteModal from './AddVoteModal/AddVoteModal';

class Votes extends Component {

  constructor({ match }) {
    super();
    this.match = match;
    this.displayVotesForId = this.displayVotesForId.bind(this);
    this.filterVotes = this.filterVotes.bind(this);
    this.filterMembers = this.filterMembers.bind(this);
  }

  componentWillReceiveProps({ match }) {
    this.match = match;
  }

  displayVotesForId(id) {
    let votes = this.filterVotes(id);
    let voteList = null;
    if (!!votes && votes.length > 0) {
      voteList = votes.map((vote, index) => {
        return <VoteCard vote={vote} key={index} />
      });
    } else {
      voteList = <div className="center-align"><h3>No votes to display.</h3></div>
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

  filterVotes(id) {
    let organisationVotes = null;
    if (!!this.props.organisations && this.props.organisations.length > 0) {
      let currentOrganisation = this.props.organisations.filter(organisation => organisation.id == id)[0];
      organisationVotes = currentOrganisation.votes;
    }
    return organisationVotes;
  }

  render() {

    let content = null;
    console.log(this.props.idExists);

    if (this.props.idExists) {
      content = <Col l={12} m={12} s={12}>
        {this.displayVotesForId(this.match.params.id)}
        <AddVoteModal organisationId={this.match.params.id} user={this.props.user} memberList={this.filterMembers(this.match.params.id)} roles={this.props.roles}></AddVoteModal>
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
    user: state.user,
    roles: state.roles,
    idExists: state.idExists
  }
}

export default connect(mapStateToProps)(Votes);
