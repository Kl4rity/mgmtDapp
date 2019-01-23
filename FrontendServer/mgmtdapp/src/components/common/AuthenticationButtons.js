import React, { Component } from 'react';
import {connect} from 'react-redux';
import {SideNavItem} from 'react-materialize';
import {Link} from 'react-router-dom';

class AuthenticationButtons extends Component {
    
    constructor(props){
        super();
        this.displayLoginLogout = this.displayLoginLogout.bind(this);
    }
    displayLoginLogout() {
        let button = null;
        if (!this.props.user.id) {
            button = <div><SideNavItem subheader>Account</SideNavItem> <SideNavItem href="https://localhost:3001/account/login">Login</SideNavItem></div>
        } else {
            button = <div><SideNavItem subheader>Account</SideNavItem> <SideNavItem href="https://localhost:3001/account/logout">Logout</SideNavItem></div>
        }
        return button;
    }
  
    render() {
    return this.displayLoginLogout()
  }
}

function mapStateToProps (state, ownProps) {
  return {
      user : state.user
  }
}

export default connect(mapStateToProps)(AuthenticationButtons)
