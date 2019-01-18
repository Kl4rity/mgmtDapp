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
    if(!!votes && votes.length > 0){
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
    if(!!this.props.organisations && this.props.organisations.length > 0){
      let currentOrganisation = this.props.organisations.filter(organisation => organisation.id == id)[0];
      organisationVotes = currentOrganisation.votes;
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
  console.log(state);
  return {
    organisations : state.organisations
    }
}

export default connect(mapStateToProps)(Votes);
