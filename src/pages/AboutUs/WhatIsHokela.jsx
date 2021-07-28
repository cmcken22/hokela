import React from 'react';
import cx from 'classnames';
import { Row, Col } from 'Components/Grid';

const TileCard = ({ index, title, className, children }) => {
  return (
    <div className={cx("about__tile-card", {
      [`about__tile-card--${className}`]: !!className
    })}>
      <div className="about__tile-card__header">
        <div className={`about__tile-card__index about__tile-card__index--${index}`} />
        <div className="about__tile-card__title">
          {title}
        </div>
      </div>

      <div className={cx({
        [`about__tile--${className}`]: !!className
      })}>
        {children}
      </div>
    </div>
  );
}

const SectionRow = ({ index, title, className, inverted, content }) => {

  const renderTileCard = () => {
    return (
      <TileCard
        index={index}
        title={title}
        className={className}
      >
        {content && content()}
      </TileCard>
    );
  }

  const renderTileImage = () => {
    return (
      <div className={`about__tile-image about__tile-image--${className}`} />
    );
  }

  return (
    <Row className="about__section-row">
      <Col span={4} offset={2}>
        {!inverted ? renderTileCard() : renderTileImage()}
      </Col>
      <Col span={4}>
        {inverted ? renderTileCard() : renderTileImage()}
      </Col>
    </Row>
  );
}

const WhatIsHokela = () => {
  return (
    <div className="about__section about__section--what-is-hokela">
      <Row>
        <Col span={8} offset={2}>
          <p>
            Hokela means "<strong>connect</strong>" in South African Sesotho language,
            and that's what we do. We offer a web platform that enables people to
            easily view and connect with causes in their area.
          </p>

          <h3>We help you find your perfect volunteer position in 3 easy steps:</h3>
        </Col>
      </Row>

      <SectionRow
        className="browse"
        title="Browse"
        index={1}
        content={() => (
          <div className="about__list-wrapper">
            <p>Use our filters to find the right fit for you, such as:</p>
            <div>
              <ul>
                <li><span>Location</span></li>
                <li><span>Sector</span></li>
                <li><span>Date and time</span></li>
                <li><span>Commitment level</span></li>
              </ul>
              <ul>
                <li><span>Skills</span></li>
                <li><span>Organization</span></li>
                <li><span>Age</span></li>
                <li><span>Suitable for</span></li>
              </ul>
            </div>
          </div>
        )}
      />

      <SectionRow
        className="apply"
        title="Apply"
        index={2}
        inverted
        content={() => (
          <div className="about__apply">
            <p>
              Once you’ve found a position that interests you, learn about the responsibilities, 
              the experience needed, the organization, and the benefits.
            </p>
            <p>Then, apply in just a few seconds.</p>
          </div>
        )}
      />

      <SectionRow
        className="connect"
        title="Connect"
        index={3}
        content={() => (
          <div className="about__connect">
            <p>Your application will be sent to the organization.</p>
            <p>
              If they wish to proceed, they will contact you to continue 
              with the next steps. 
            </p>
          </div>
        )}
      />
    </div>
  );
};

export default WhatIsHokela;