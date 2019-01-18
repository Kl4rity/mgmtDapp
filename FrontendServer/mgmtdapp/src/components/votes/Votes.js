import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    if(votes.length > 0){
      voteList = votes.map((vote, index)=>{
         return <li key={index}>{vote.name}</li>
      });
    } else {
      voteList = <li>No votes to display</li>
    }
    return voteList;
  }

  filterVotes(id){
    let organisationVotes = null;
    if(!!this.props.organisations & !!this.props.votes){
      let currentOrganisation = this.props.organisations.filter(organisation => organisation.id == id)[0];
      organisationVotes = this.props.votes.filter(vote => currentOrganisation.voteIds.indexOf(vote.id) >= 0);
    }
    return organisationVotes;
  }

  render() {
    return (
      <div>
        <ul>
          {this.displayVotesForId(this.match.params.id)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    organisations : state.organisations,
    votes : state.votes
  }
}

export default connect(mapStateToProps)(Votes);
