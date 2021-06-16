import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fromJS, Map } from 'immutable';
import { withRouter } from "react-router-dom";

import { Row, Col } from 'Components/Grid';
import Hero from 'Components/Hero';
import Card from 'Components/Card';
import Section from 'Components/Section';
import Button from 'Components/Button';
import Footer from 'Components/Footer';

import * as causeActions from 'Actions/causeActions';
import * as filterActions from 'Actions/filterActions';
import VolunteerInfo from './VolunteerInfo';
import LatestCauses from './LatestCauses';
import HokelaCauses from './HokelaCauses';
import AboutHokela from './AboutHokela';
import CommentCarousel from 'Components/CommentCarousel';

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
      <div className="home">
        <Hero />
        <Section
          title="Latest Causes"
          content={() => (
            <LatestCauses
              causes={latestCauses}
              openCause={this.openCause}
              browseAllCauses={this.handleBrowseAllCauses}
            />
          )}
        />
        <Section
          title="Volunteer With Us"
          icon={this.hokelaIconLink}
          dark
          content={this.renderVolunteerWithUs}
          content={() => (
            <HokelaCauses
              causes={latestCauses}
              openCause={this.openCause}
              browseAllCauses={this.handleBrowseAllCauses}
            />
          )}
        />
        <Section
          title="Do You Need Volunteers?"
          content={() => (<VolunteerInfo />)}
        />
        <Section
          title="About Hokela"
          dark
          content={() => (<AboutHokela />)}
        />
        <Section
          title="What People Say"
          content={() => (<CommentCarousel />)}
        />
        <Footer />
      </div>
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
