import React from 'react'
import VoteDisplay from '../VoteDisplay/VoteDisplay';
import { Card } from 'react-materialize';

function displayDescriptionIfPresent(description){
    let descriptionHTML = null;
    if(description){
        descriptionHTML = <p>{description}</p>
    }
    return descriptionHTML;
}

function calculateVoteStatus(votes){
    let votesFor = 0;
    let votesAgainst = 0;
    let votesTotal = 0;
    let votesCast = 0;
    votesTotal = votes.length;
    votes.forEach((vote)=>{
        if(vote.response === true){
            votesFor ++;
        }
        if(vote.response === false){
            votesAgainst ++;
        }
        votesCast ++;
    });
    return <VoteDisplay votesFor={votesFor} votesAgainst={votesAgainst} votesCast={votesCast} votesTotal={votesTotal}/>
}

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

export default function voteCard(props) {
    console.log(props.vote);
  return (
    <Card title = {props.vote.name}>
        {displayDescriptionIfPresent(props.vote.description)}
        <div><span>Concluded: </span> <span>{(props.vote.hasEnded) ? "Yes" : "No"}</span> | <span>Ending: </span> <span>{formatDate(new Date(props.vote.endDate))}</span> | <span>Created: </span> <span>{formatDate(new Date(props.vote.creationDate))}</span></div>
        {calculateVoteStatus(props.vote.votes)}
    </Card>
  )
}
