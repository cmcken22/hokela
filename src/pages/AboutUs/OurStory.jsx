import React from 'react';
import { Row, Col } from 'Components/Grid';

const OurStory = () => {
  return (
    <div className="about__section about__section--our-story">
      <Row>
        <Col span={8} offset={2}>
          <p>
            At Hokela, we believe people want to be part of something bigger than themselves. 
            People want to help a cause that is meaningful to them and close to their hearts. 
          </p>
          <p>
            However, given our busy work and life commitments, it is hard to quickly find volunteer 
            opportunities that match our skills, interests, schedule, location, and level of commitment.
          </p>
          <p>
            And that's what we want to change. <strong>We want to make it easy for people to find and connect with 
            the causes that are important to them.</strong> A simplified process that unites volunteers with organizations.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default OurStory;