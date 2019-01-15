import React, { Component } from 'react';

class TestLinkComponent extends Component {
  render() {
    return (
        <div>
            <div>
                <h3>
                Login
                </h3>
                <a
                className="App-link"
                href="https://localhost:3001/account/login"
                target="_blank"
                rel="noopener noreferrer"
                >
                Login
                </a>
                <br></br>
                <a
                className="App-link"
                href="https://localhost:3001/account/logout"
                target="_blank"
                rel="noopener noreferrer"
                >
                Logout
                </a>
            </div>
            <div>
                <h3>
                User
                </h3>
                <a
                className="App-link"
                href="https://localhost:3001/"
                target="_blank"
                rel="noopener noreferrer"
                >
                Get all data for user
                </a>
            </div>
            <div>
                <h3>
                Organisations
                </h3>
                <a
                className="App-link"
                href="https://localhost:3001/organisation/create?organisationName=NextOrganisation"
                target="_blank"
                rel="noopener noreferrer"
                >
                create Organisation
                </a>
            </div>
            <div>
                <h3>
                Votes
                </h3>
                <a
                className="App-link"
                href="https://localhost:3001/vote/create?organisationId=5c3c82a15956a40020d8e79b&voteName=NewVote&descritpion=None&endTime=1550134736000"
                target="_blank"
                rel="noopener noreferrer"
                >
                create Vote
                </a>
                <br></br>
                <a
                className="App-link"
                href="https://localhost:3001/vote/cast?idOfVote=5c3c83175956a40020d8e7a3&organisationId=5c3c82a15956a40020d8e79b&vote=true"
                target="_blank"
                rel="noopener noreferrer"
                >
                cast
                </a>
            </div>
        </div>
    );
  }
}

export default TestLinkComponent;