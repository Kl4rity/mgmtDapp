import React, { Component } from 'react';
import ApprovalDialogue from '../../common/ApprovalDialogue';
import roleUtils from '../../utils/roleUtils';
import postDataServiceSingleton from '../../../services/postService';

export class DeleteOrganisation extends Component {

    constructor(props){
        super(props);
        this.deleteOrganisation = this.deleteOrganisation.bind(this);
        this.memberCanDeleteOrganisation = this.memberCanDeleteOrganisation.bind(this);
        this.displayDeleteOption = this.displayDeleteOption.bind(this);
        this.postDataService = postDataServiceSingleton.getPostServiceInstance();
    }

    deleteOrganisation(organisationId){
        this.postDataService.postData('https://localhost:3001/organisation/close/', {
            organisationId : organisationId
        });
    }

    memberCanDeleteOrganisation(user, memberList, rolesList) {
        let canRemoveOrganisation = false;
        let userRole = roleUtils.getRoleForUserInOrganisation(user, memberList, rolesList);
        if (!!userRole) {
            canRemoveOrganisation = userRole.permissions.organisation.close;
        }
        return canRemoveOrganisation;
    }

    displayDeleteOption(){
        let option = null;
        if(this.memberCanDeleteOrganisation(this.props.user, this.props.memberList, this.props.roles)){
            option = <ApprovalDialogue args={[this.props.organisationId]} onApproval={this.deleteOrganisation} trigger = {<span className = "mgmt-organisations-navitem-align-right"> X </span>}></ApprovalDialogue>
        }
        return option;
    }

  render() {
    return (
      this.displayDeleteOption()
    )
  }
}

export default DeleteOrganisation;
