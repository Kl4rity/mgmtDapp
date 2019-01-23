import React from 'react';
import {Row, Col, ProgressBar} from 'react-materialize';
import './LoadingOverlay.css';

export default function LoadingOverlay() {
  return (
    <div>
        <Row className="main-container-loading-overlay-container-row">
          <Col className="main-container-loading-overlay-column" s={0} m={0} l={3}/>
          <Col className="main-container-loading-overlay-column" s={12} m={12} l={9}>
             <div className="main-container-loading-overlay">
                 
             </div>
             <ProgressBar className="main-container-loading-overlay-progress-bar"></ProgressBar>
          </Col>
      </Row>
    </div>
  )
}
