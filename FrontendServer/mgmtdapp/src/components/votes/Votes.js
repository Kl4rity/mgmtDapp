import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteCard from './VoteCard/VoteCard';

import {Col} from 'react-materialize';
import AddVoteModal from './AddVoteModal/AddVoteModal';

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

  filterVotes(id){
    let organisationVotes = null;
    if(!!this.props.organisations && this.props.organisations.length > 0){
      console.log(this.props.organisations);
      let currentOrganisation = this.props.organisations.filter(organisation => organisation.id == id)[0];
      console.log(currentOrganisation);
      organisationVotes = currentOrganisation.votes;
    }
    return organisationVotes;
  }

  render() {
    return (
      <Col l={12} m={12} s={12}>
          {this.displayVotesForId(this.match.params.id)}
          <AddVoteModal></AddVoteModal>
      </Col>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    organisations : state.organisations
    }
}

export default connect(mapStateToProps)(Votes);
