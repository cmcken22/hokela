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
import FindYourPerfectMatch from './FindYourPerfectMatch';
import HaveSomeQuestions from './HaveSomeQuestions';
import Overlay from './Overlay';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 500
    };
  }

  createContainerRef = (ref) => {
    if (!this.containerRef) {
      this.containerRef = ref;
      if (this.overlayApi && this.overlayApi.setContainerRef) {
        this.overlayApi.setContainerRef(ref);
      }
    }
  }

  createOverlayApi = (api) => {
    if (!this.overlayApi) {
      this.overlayApi = api;
      if (!!this.containerRef) {
        this.overlayApi.setContainerRef(ref);
      }
    }
  }

  // calcHeightOfOverlay = () => {
  //   console.clear();
  //   console.log('this.containerRef:', this.containerRef);
  //   // const { height, ...rest } = this.containerRef.getBoundingClientRect();
  //   const rest = this.containerRef.getBoundingClientRect();
  //   const { height } = rest;
  //   console.log('height:', height);
  //   console.log('rest:', rest);
  //   this.setState({ height });
  // }

  renderHeader = () => {
    return (
      <div className="about__header">
        <BreadCrumbs crumbs={[{ name: 'About us' }]} />
        <Row>
          <Col span={12}>
            <h1>
              About us
            </h1>
          </Col>
        </Row>
      </div>
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
      <Page large>
        <div className="about" ref={this.createContainerRef}>
          {this.renderHeader()}
          <Overlay
            createApi={this.createOverlayApi}
          />
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
          <Section
            hideIcon
            darkGradient
            className="about__pad-heder"
            content={() => (<FindYourPerfectMatch />)}
          />
          <Section
            hideIcon
            className="about__pad-heder"
            content={() => (<HaveSomeQuestions />)}
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
