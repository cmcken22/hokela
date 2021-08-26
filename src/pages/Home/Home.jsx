import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fromJS, Map } from 'immutable';
import { withRouter } from "react-router-dom";

import * as causeActions from 'Actions/causeActions';
import * as filterActions from 'Actions/filterActions';

import Page from 'Components/Page';
import Hero from 'Components/Hero';
import VolunteerInfo from './VolunteerInfo';
import LatestCauses from './LatestCauses';
import HokelaCauses from './HokelaCauses';
import AboutHokela from './AboutHokela';
import ContactUs from './ContactUs';
import CommentCarousel from 'Components/CommentCarousel';
import PartnerCarousel from 'Components/PartnerCarousel';

class Home extends Component {
  constructor(props) {
    super(props);
    this.hokelaIconLink = '/images/icons/hokela_icon.png';
    this.state = {};
  }
  
  componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  }

  openCause = (id) => {
    const { history } = this.props;
    history.push(`/causes/${id}`);
  }

  handleBrowseAllCauses = (hokelaCauses = false) => {
    const { filterActions, history } = this.props;
    filterActions.clearAllFilters();

    if (hokelaCauses) {
      filterActions.setFilterValue('organizations', 'Hokela Technologies');
      setTimeout(() => {
        filterActions.performSearch();
        history.push('/causes');
      });
    } else {
      filterActions.performSearch();
      history.push('/causes');
    }
  }

  render() {
    const { latestCauses } = this.props;

    return (
      <Page className="home">
        <Hero />
        <Page.Section title="Latest Causes">
          <LatestCauses
            causes={latestCauses}
            openCause={this.openCause}
            browseAllCauses={this.handleBrowseAllCauses}
          />
        </Page.Section>
        <Page.Section
          title="Volunteer With Us"
          icon={this.hokelaIconLink}
          dark
        >
          <HokelaCauses
            causes={latestCauses}
            openCause={this.openCause}
            browseAllCauses={this.handleBrowseAllCauses}
          />
        </Page.Section>
        <Page.Section title="Do You Need Volunteers?">
          <VolunteerInfo />
        </Page.Section>
        <Page.Section title="About Hokela" dark>
          <AboutHokela />
        </Page.Section>
        <Page.Section title="What People Say">
          <>
            <CommentCarousel />
            <PartnerCarousel />
          </>
        </Page.Section>
        <Page.Section title="We want to know you" darkGradient>
          <ContactUs />
        </Page.Section>
      </Page>
    );
  }
}

export default connect(
  state => {
    return ({
    hokelaCauses: state.getIn(['causes', 'featured', 'HOKELA']),
    latestCauses: state.getIn(['causes', 'featured', 'ALL']),
  })},
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch),
    filterActions: bindActionCreators(filterActions, dispatch)
  })
)(withRouter(Home));
