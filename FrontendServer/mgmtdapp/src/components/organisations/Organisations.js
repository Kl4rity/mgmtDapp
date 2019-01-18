import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Organisations extends Component {

  organisationRow(organisation, index){
    return <li key = {index}> <Link to={"/organisation/"+ organisation.id + "/votes/"}>{organisation.name} </Link></li>;
  }
  render() {
    let organisations;
    if (this.props.organisations){
      organisations = this.props.organisations.map(this.organisationRow);
    } else {
      organisations = <li>No organisations.</li>;
    }

    return (
      <div>
        <ul>
          {organisations}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
    return {
        organisations: state.organisations
    }
}

Organisations.propTypes = {
  organisations: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Organisations);