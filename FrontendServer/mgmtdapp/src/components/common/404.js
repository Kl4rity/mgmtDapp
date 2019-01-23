import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';

export class Page404 extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col s={0} m={0} l={3} />
          <Col className="center-align" s={12} m={12} l={9}>
            <div>
              <h2>404</h2>
              <p>This page does not exist.</p>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Page404
