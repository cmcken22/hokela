import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { Row, Col } from 'Components/Grid';
import BreadCrumbs from 'Components/BreadCrumbs';
import Page from 'Components/Page';
import Section from 'Components/Section';

import WhatIsHokela from './WhatIsHokela';
import OurStory from './OurStory';
import OurLogo from './OurLogo';
import OurTeam from './OurTeam';

const TileCard = ({ index, title, classname, children }) => {
  return (
    <div className="about__tile-card">
      <div className="about__tile-card__header">
        <div className={`about__tile-card__index about__tile-card__index--${index}`}>
          {index}
        </div>
        <div className="about__tile-card__title">
          {title}
        </div>
      </div>

      <div className={cx({
        [`about__tile--${classname}`]: !!classname
      })}>
        {children}
      </div>
    </div>
  );
}

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHeader = () => {
    return (
      <>
        <BreadCrumbs crumbs={[{ name: 'About us' }]} />
        <Row>
          <Col span={12}>
            <h1>
              About us
            </h1>
          </Col>
        </Row>
      </>
    );
  }

  renderSectionTitle = (value) => {
    return (
      <div className="about__title">
        <h2>{value}</h2>
        <div className="about__title__underline" />
      </div>
    )
  }

  render() {
    return(
      <Page>
        <div className="about">
          {this.renderHeader()}
          <Section
            title="What is Hokela?"
            content={() => (<WhatIsHokela />)}
          />
          <Section
            dark
            title="Our Story"
            className="about__pad-heder"
            content={() => (<OurStory />)}
          />
          <Section
            dark
            title="Our Logo"
            className="about__pad-heder"
            content={() => (<OurLogo />)}
          />
          <Section
            title="Our Team"
            className="about__pad-heder"
            content={() => (<OurTeam />)}
          />
        </div>
      </Page>
    );
  }
}

AboutUs.constants = {
  en: {
    labels: {}
  }
};

export default withRouter(AboutUs);
