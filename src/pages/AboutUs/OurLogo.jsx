import React from 'react';
import { Row, Col } from 'Components/Grid';

const OurLogo = () => {
  return (
    <div className="about__section about__section--our-logo">
      <Row>
        <Col span={8} offset={2}>
          <p>
            The story behind our unique logo stems from our mission to connect the people 
            and organizations that make our community great. 
          </p>
          <p>
            The four clefs are meant to symbolize the coming together of non-profits, charities, 
            and most importantly, volunteers, which are the backbone of all initiatives in the social-good sector.
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={3}>
          <div className="about__section__logo" />
        </Col>
      </Row>
    </div>
  );
};

export default OurLogo;