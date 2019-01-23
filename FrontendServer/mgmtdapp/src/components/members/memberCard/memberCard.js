import React from 'react'
import {Card} from 'react-materialize';
import RemoveMember from '../RemoveMember/RemoveMember';
import RoleChanger from '../RoleChanger/RoleChanger';

export default function memberCard(props) {
    let username = "";

    if(props.member.username){
        username = props.member.username;
    }

  return (
    <Card className="hoverable" title={username}>
      <div><span>Email:</span> <span>{props.member.email}</span></div>
      <div><span>Role: </span>
      <RoleChanger
        roles = {props.roles}
        memberList = {props.members}
        user = {props.user}
        organisationId = {props.organisationId}
        userId = {props.member.id}
        member = {props.member}
      />
      </div>
      <RemoveMember
        roles = {props.roles}
        memberList = {props.members}
        user = {props.user}
        organisationId = {props.organisationId}
        userId = {props.member.id}
      />
    </Card>
  )
}
