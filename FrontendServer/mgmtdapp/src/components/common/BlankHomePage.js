import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';

export class BlankHomePage extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col s={0} m={0} l={3} />
          <Col className="center-align" s={12} m={12} l={9}>
            <div>
              <h2>No Organisation selected</h2>
              <p>If you're not logged in yet, do so now and select an organisation from the sidebar.</p>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BlankHomePage;