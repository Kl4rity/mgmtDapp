import React, { Component } from 'react'

export class Navbar extends Component {
  render() {
    return (
      <nav>
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
      </nav>
    )
  }
}

export default Navbar;