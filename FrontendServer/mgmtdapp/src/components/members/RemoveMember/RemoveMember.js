import React, { Component } from 'react';
import ApprovalDialogue from '../../common/ApprovalDialogue';
import roleUtils from '../../utils/roleUtils';
import postDataServiceSingleton from '../../../services/postService';
import './RemoveMember.css';

export class RemoveMember extends Component {

    constructor(props){
        super(props);
        this.removeMember = this.removeMember.bind(this);
        this.memberCanRemoveMember = this.memberCanRemoveMember.bind(this);
        this.displayRemoveOption = this.displayRemoveOption.bind(this);
        this.postDataService = postDataServiceSingleton.getPostServiceInstance();
    }

    removeMember(organisationId, userId){
        this.postDataService.postData('https://localhost:3001/organisation/remove/', {
            organisationId : organisationId,
            userId : userId
        });
    }

    memberCanRemoveMember(user, memberList, rolesList) {
        let canRemoveMember = false;
        let userRole = roleUtils.getRoleForUserInOrganisation(user, memberList, rolesList);
        if (!!userRole) {
            canRemoveMember = userRole.permissions.organisation.removeMember;
        }
        return canRemoveMember;
    }

    displayRemoveOption(){
        let option = null;
        if(this.memberCanRemoveMember(this.props.user, this.props.memberList, this.props.roles)){
            option = <ApprovalDialogue args={[this.props.organisationId, this.props.userId]} onApproval={this.removeMember} trigger = {<span className = "mgmt-members-delete-align-right-top"> X </span>}></ApprovalDialogue>
        }
        return option;
    }

  render() {
    return (
      this.displayRemoveOption()
    )
  }
}

export default RemoveMember;
