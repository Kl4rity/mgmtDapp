import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

import Votes from '../../votes/Votes';
import Page404 from '../../common/404';
import Members from '../../members/Members';

export class Organisation extends Component {

  constructor({match}){
    super();
    this.match = match;
    this.id = match.params.id;
    this.displayOrganisation = this.displayOrganisation.bind(this);
  }

  displayOrganisation(){
    let id = this.match.params.id;
    let organisation = this.props.organisations.filter((organisation)=>{return organisation.id == id})[0];
    if(organisation){
      return <p>{organisation.name}</p>
    } else {
      return <p>No organisation to display</p>
    }
  }

  render() {
    return (
      <div>
        {this.displayOrganisation()}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    organisations : state.organisations
  }
}

export default connect(mapStateToProps)(Organisation);
