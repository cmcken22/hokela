import React from 'react';
import { Row, Col } from 'Components/Grid';
import Button from 'Components/Button';

const renderLearnMoreBtn = () => {
  return (
    <div className="home__learn-more-btn-container">
      <Row>
        <Col span={2} offset={7}>
          <Button
            className="home__learn-more-btn"
            caseSensitive
            style={{
              marginTop: '50px'
            }}
          >
            Learn more
          </Button>
        </Col>
      </Row>
    </div>
  );
}

const VolunteerInfo = () => {
  return (
    <Row>
      <Col span={6}>
        <div className="home__volunteer-image" />
      </Col>
      <Col span={5} offset={1}>
        <div className="home__volunteer-info">
          <p>We understand that finding the ideal volunteer candidate isn’t always easy.</p>
          <h4>So, let us help with that.</h4>
          <p>
            Our platform enables volunteer recruiters to increase their program
            visibility <span>for free</span> and maximize their volunteer candidate pool.
          </p>
          {renderLearnMoreBtn()}
        </div>
      </Col>
    </Row>
  );
};

export default VolunteerInfo;