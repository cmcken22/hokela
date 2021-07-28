import React from 'react';
import { Row, Col } from 'Components/Grid';
import Button from 'Components/Button';

const HaveSomeQuestions = () => {
  return (
    <div className="about__section about__section--questions">
      <Row>
        <Col span={12}>
          <h1>Have some questions?</h1>
          <div className="about__action-container about__action-container--small">
            <Button
              secondary
              caseSensitive
            >
              Contact us
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HaveSomeQuestions;