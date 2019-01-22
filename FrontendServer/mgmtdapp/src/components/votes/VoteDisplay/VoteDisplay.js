import React from 'react'
import { Row, Chip } from 'react-materialize';
import thumbsUp from '../../../assets/thumb-up.svg';
import thumbsDown from '../../../assets/thumb-down.svg';
import ballot from '../../../assets/counted.svg';
import unknown from '../../../assets/unknown.svg';
import './VoteDisplay.css';

export default function voteDisplay(props) {
  return (
    <Row>
      <Chip>
        <img src={thumbsUp} alt='Votes For'/>
        {props.votesFor}
      </Chip>
      <Chip>
        <img src={thumbsDown} alt='Votes Against'/>
        {props.votesAgainst}
      </Chip>
    <span className='vote-display-separator'>|</span>
      <Chip>
        <img src={ballot} alt='Votes Counted'/>
        {props.votesCast}
      </Chip>
      <Chip>
        <img src={unknown} alt='Votes Unknown'/>
        {props.votesTotal - props.votesCast}
      </Chip>
    </Row>
  )
}
