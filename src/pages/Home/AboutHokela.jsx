import React from 'react';
import { Row, Col } from 'Components/Grid';
import Button from 'Components/Button';

const renderMoreAboutUsBtn = () => {
  return (
    <div className="home__learn-more-btn-container">
      <Row>
        <Col span={2}>
          <Button
            className="home__learn-more-btn"
            caseSensitive
            style={{
              marginTop: '50px'
            }}
          >
            More about us
          </Button>
        </Col>
      </Row>
    </div>
  );
}

const AboutHokela = () => {
  return (
    <Row>
      <Col span={5}>
        <div className="home__volunteer-info">
          <h4>Connecting volunteers with causes</h4>
          <p>
            Hokela means <span>"connect"</span> in South African Sesotho language, and that's what we do.
            Our mission is to connect passionate volunteers with causes that are meaningful to them.
          </p>
          <p>
            Hokela is web platform that enables people to find volunteer opportunities based on specified
            criteria such as location, sector, time of day, commitment level, and many more.
          </p>
          {renderMoreAboutUsBtn()}
        </div>
      </Col>
      <Col span={6} offset={1}>
        <div className="home__about-us-image" />
      </Col>
    </Row>
  );
};

export default AboutHokela;