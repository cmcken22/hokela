import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fromJS, Map } from 'immutable';
import { withRouter } from "react-router-dom";

import { Row, Col } from '../Grid';
import Hero from '../Hero';
import Card from '../Card';
import Section from '../Section';
import Button from '../Button';
import Footer from '../Footer';

import * as causeActions from '../../actions/causeActions';
import * as filterActions from '../../actions/filterActions';

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

  filterLatestCauses = () => {
    const { latestCauses } = this.props;

    let nextCauses = new Map({});
    if (!latestCauses || latestCauses.size === 0) return nextCauses;
    latestCauses.entrySeq().forEach(([id, cause]) => {
      const { organization, image_link: imageLink } = cause.toJS();
      if (organization !== "Hokela Technologies" && !!imageLink) {
        nextCauses = nextCauses.set(id, cause);
      }
    });

    return nextCauses;
  }

  renderLatestCauses = () => {
    const latestCauses = this.filterLatestCauses();

    return (
      <>
        <Row>
          {latestCauses && latestCauses.entrySeq().map(([id, cause], index) => {
            if (index < 3) {
              return (
                <Col key={id} span={4}>
                  <Card
                    {...cause.toJS()}
                    openCause={this.openCause}
                  />
                </Col>
              );
            }
            return null;
          })}
        </Row>
        <Row>
          <Col span={3} offset={9}>
            <Button
              onClick={() => this.handleBrowseAllCauses()}
              caseSensitive
              secondary
              style={{
                width: '100%',
                marginTop: '52px'
              }}
            >
              Browse all causes
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  filterHokelaCauses = () => {
    const { hokelaCauses } = this.props;

    let nextCauses = new Map({});
    if (!hokelaCauses || hokelaCauses.size === 0) return nextCauses;
    hokelaCauses.entrySeq().forEach(([id, cause]) => {
      const { image_link: imageLink } = cause.toJS();
      if (!!imageLink) {
        nextCauses = nextCauses.set(id, cause);
      }
    });

    return nextCauses;
  }

  renderVolunteerWithUs = () => {
    const hokelaCauses = this.filterHokelaCauses();

    return (
      <>
        <Row>
          {hokelaCauses && hokelaCauses.entrySeq().map(([id, cause], index) => {
            if (index < 3) {
              return (
                <Col key={id} span={4}>
                  <Card
                    {...cause.toJS()}
                    dark
                    openCause={this.openCause}
                  />
                </Col>
              );
            }
            return null;
          })}
        </Row>
        <Row>
          <Col span={3} offset={9}>
            <Button
              onClick={() =>this.handleBrowseAllCauses(true)}
              caseSensitive
              secondary
              style={{
                width: '100%',
                marginTop: '52px'
              }}
            >
              Browse all causes
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  renderInfoSection = () => {
    return (
      <Row>
        <Col span={8}>
          <div className="home__volunteer-image" />
        </Col>
        <Col span={4}>
          <div className="home__volunteer-info">
            <p>We understand that finding the ideal volunteer candidate isn’t always easy.</p>
            <p>So, let us help with that.</p>
            <p>
              Our platform enables volunteer recruiters to increase their program 
              visibility for free and maximize their volunteer candidate pool.
            </p>
            <Button
              caseSensitive
              style={{
                marginTop: '50px'
              }}
            >
              Learn more
            </Button>
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className="home">
        <Hero />
        <Section
          title="Latest Causes"
          content={this.renderLatestCauses}
        />
        <Section
          title="Volunteer With Us"
          content={this.renderVolunteerWithUs}
          icon={this.hokelaIconLink}
          dark
        />
        <Section
          title="Do You Need Volunteers?"
          content={this.renderInfoSection}
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
