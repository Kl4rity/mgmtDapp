import React, { Component } from 'react';
import roleUtils from '../../utils/roleUtils';
import postDataServiceSingleton from '../../../services/postService';
import './RoleChanger.css';
import { Dropdown, Button, NavItem } from 'react-materialize';

export class RoleChanger extends Component {

    constructor(props){
        super(props);
        this.changeRole = this.changeRole.bind(this);
        this.memberCanChangeRole = this.memberCanChangeRole.bind(this);
        this.displayRoleChanger = this.displayRoleChanger.bind(this);
        this.postDataService = postDataServiceSingleton.getPostServiceInstance();
        this.changeRole = this.changeRole.bind(this);
        this.onRoleChangerClicked = this.onRoleChangerClicked.bind(this);
    }

    changeRole(organisationId, userId, newRole){
        this.postDataService.postData('https://localhost:3001/organisation/changeRole/', {
            organisationId : organisationId,
            userId : userId,
            newRole : newRole
        });
    }

    onRoleChangerClicked(event){
        let newRole = event.target.innerHTML;
        this.changeRole(this.props.organisationId, this.props.userId, newRole);
    }

    memberCanChangeRole(user, memberList, rolesList) {
        let canChangeRole = false;
        let userRole = roleUtils.getRoleForUserInOrganisation(user, memberList, rolesList);
        if (!!userRole) {
            canChangeRole = userRole.permissions.member.changeRole;
        }
        return canChangeRole;
    }

    buildItems(){
        let roles = this.props.roles.filter((role)=>{return role.name != 'default'});
        let items = roles.map(( role )=>{ 
            return <li className="mgmt-dropdown-capitalize"><a onClick={this.onRoleChangerClicked} href="#">{role.name}</a></li>
         });
         return items;
    }

    displayRoleChanger(){
        let option = null;
        if(this.memberCanChangeRole(this.props.user, this.props.memberList, this.props.roles)){
            option = <Dropdown trigger={<Button>{this.props.member.role} ▼</Button>}>
                <ul>{this.buildItems()}</ul>
            </Dropdown>
        } else {
            option = <Button disabled>{this.props.member.role}</Button>
        }
        return option;
    }

  render() {
    return (
      this.displayRoleChanger()
    )
  }
}

export default RoleChanger;
