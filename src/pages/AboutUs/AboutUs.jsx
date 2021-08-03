import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import Page from 'Components/Page';
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

  render() {
    return(
      <Page>
        <Overlay />
        <Page.Header
          title="About us"
          breadCrums={[{ name: "About us" }]}
        />
        <Page.Section title="What is Hokela?" first>
          <WhatIsHokela />
        </Page.Section>
        <Page.Section title="Our Story" dark>
          <OurStory />
        </Page.Section>
        <Page.Section title="Our Logo" dark>
          <OurLogo />
        </Page.Section>
        <Page.Section title="Our Team">
          <OurTeam />
        </Page.Section>
        <Page.Section darkGradient>
          <FindYourPerfectMatch />
        </Page.Section>
        <Page.Section>
          <HaveSomeQuestions />
        </Page.Section>
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
