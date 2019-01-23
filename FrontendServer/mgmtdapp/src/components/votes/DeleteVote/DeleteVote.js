import React, { Component } from 'react';
import ApprovalDialogue from '../../common/ApprovalDialogue';
import roleUtils from '../../utils/roleUtils';
import postDataServiceSingleton from '../../../services/postService';
import './DeleteVote.css'

export class DeleteVote extends Component {

    constructor(props){
        super(props);
        this.deleteVote = this.deleteVote.bind(this);
        this.memberCanDeleteVote = this.memberCanDeleteVote.bind(this);
        this.displayDeleteOption = this.displayDeleteOption.bind(this);
        this.postDataService = postDataServiceSingleton.getPostServiceInstance();
    }

    deleteVote(organisationId, idOfVote){
        console.log(this.props.idOfVote);
        this.postDataService.postData('https://localhost:3001/vote/remove/', {
            organisationId : organisationId,
            idOfVote : idOfVote
        });
    }

    memberCanDeleteVote(user, memberList, rolesList) {
        let canRemoveOrganisation = false;
        let userRole = roleUtils.getRoleForUserInOrganisation(user, memberList, rolesList);
        if (!!userRole) {
            canRemoveOrganisation = userRole.permissions.vote.remove;
        }
        return canRemoveOrganisation;
    }

    displayDeleteOption(){
        let option = null;
        if(this.memberCanDeleteVote(this.props.user, this.props.memberList, this.props.roles)){
            option = <ApprovalDialogue args={[this.props.organisationId, this.props.idOfVote]} onApproval={this.deleteVote} trigger = {<span className = "mgmt-votes-delete-align-right-top"> X </span>}></ApprovalDialogue>
        }
        return option;
    }

  render() {
    return (
      this.displayDeleteOption()
    )
  }
}

export default DeleteVote;
