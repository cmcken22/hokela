import React from 'react';
import { Row, Col } from 'Components/Grid';
import Button from 'Components/Button';

const WhyChooseHokela = () => {
  return (
    <div className="find__section find__section--why-choose-hokela">
      <Row>
        <Col span={5}>
          <div className="find__why-choose-hokela-image" />
        </Col>
        <Col span={6} offset={1}>
          <div className="find__why-choose-hokela-content">
            <p>
              We understand that finding the ideal volunteer candidate isn’t always easy. 
              Creating an attractive volunteer post, reaching out to people, and accessing a 
              pool of high-quality candidates can take time, energy, and resources.
            </p>
            <h2>So, let us help with that.</h2>
            <p>
              We offer a platform that enables volunteer recruiters to increase their program 
              visibility <strong>for free</strong> and maximize their volunteer candidate pool. With our fillable 
              Volunteer Posting Form, you can easily create an attractive volunteer post that will 
              appear on our site, enabling you to attract the ideal candidate.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WhyChooseHokela;