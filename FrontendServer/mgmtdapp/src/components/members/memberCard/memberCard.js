import React from 'react'
import {Card} from 'react-materialize';

export default function memberCard(props) {
    let username = "";

    if(props.member.username){
        username = props.member.username;
    }

  return (
    <Card title={username}>
      <div><span>Email: </span> <span>{props.member.email}</span></div>
      <div><span>Role: </span> <span>{props.member.role}</span></div>
    </Card>
  )
}
