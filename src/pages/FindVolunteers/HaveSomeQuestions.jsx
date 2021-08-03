import React from 'react';
import { Row, Col } from 'Components/Grid';
import Button from 'Components/Button';

const HaveSomeQuestions = () => {
  return (
    <div className="find__section find__section--questions">
      <Row>
        <Col span={9}>
          <h1>Have some questions?</h1>
          <p>We’d be happy to help. Contact us for any questions you may have.</p>
          <div className="find__action-container find__action-container--small">
            <Button
              caseSensitive
            >
              Contact us
            </Button>
          </div>
        </Col>
        <Col span={3}>
          <div className="find__questions-image" />
        </Col>
      </Row>
    </div>
  );
};

export default HaveSomeQuestions;