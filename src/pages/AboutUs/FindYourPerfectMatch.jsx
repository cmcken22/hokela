import React from 'react';
import { withRouter } from "react-router-dom";
import { Row, Col } from 'Components/Grid';
import Button from 'Components/Button';

const FindYourPerfectMatch = ({ history }) => {

  const openLink = (link) => {
    history.push(link);
    window.scrollTo(0, 0);
  }

  return (
    <div className="about__section about__section--perfect-match">
      <Row>
        <Col span={12}>
          <h1>Find your perfect match.</h1>
        </Col>
      </Row>
      <Row>
        <Col span={3} offset={2}>
          <div className="about__action-container">
            <p>Are you a volunteer?</p>
            <Button
              caseSensitive
              onClick={() => openLink('/causes')}
            >
              Find Causes
            </Button>
          </div>
        </Col>
        <Col span={3} offset={2}>
          <div className="about__action-container">
            <p>Are you an organization?</p>
            <Button
              caseSensitive
              onClick={() => openLink('/find-volunteers')}
            >
              Find Volunteers
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(FindYourPerfectMatch);