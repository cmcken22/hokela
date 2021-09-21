import React from 'react';
import { withRouter } from "react-router-dom";
import { Row, Col } from 'Components/Grid';
import Button from 'Components/Button';

const VolunteerInfo = ({ history }) => {

  const handleLearnMore = () => {
    history.push('/find-volunteers');
  };

  const renderLearnMoreBtn = () => {
    return (
      <div className="home__learn-more-btn-container">
        <div>
          <Row>
            <Col span={2} offset={7}>
              <Button
                onClick={handleLearnMore}
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
      </div>
    );
  }

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

export default withRouter(VolunteerInfo);