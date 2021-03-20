import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fromJS, Map } from 'immutable';

import { Row, Col } from '../Grid';
import Hero from '../Hero';
import Card from '../Card';
import Section from '../Section';
import Button from '../Button';
import Footer from '../Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.hokelaIconLink = '/public/images/icons/hokela_icon.png';
    this.state = {};
  }
  
  filterLatestCauses = () => {
    const { latestCauses } = this.props;

    let nextCauses = new Map({});
    if (!latestCauses || latestCauses.size === 0) return nextCauses;
    latestCauses.entrySeq().forEach(([id, cause]) => {
      const { organization } = cause.toJS();
      if (organization !== "Hokela Technologies") {
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
                  <Card {...cause.toJS()} />
                </Col>
              );
            }
            return null;
          })}
        </Row>
        <Row>
          <Col span={3} offset={9}>
            <Button
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

  renderVolunteerWithUs = () => {
    const { hokelaCauses } = this.props;
    return (
      <>
        <Row>
          {hokelaCauses && hokelaCauses.entrySeq().map(([id, cause], index) => {
            if (index < 3) {
              return (
                <Col key={id} span={4}>
                  <Card {...cause.toJS()} dark />
                </Col>
              );
            }
            return null;
          })}
        </Row>
        <Row>
          <Col span={3} offset={9}>
            <Button
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

// export default Home;
export default connect(
  state => ({
    // userInfo: state.get('user'),
    // email: state.getIn(['user', 'email']),
    // isAdmin: state.getIn(['user', 'isAdmin']),
    hokelaCauses: state.getIn(['causes', 'HOKELA']),
    latestCauses: state.getIn(['causes', 'ALL']),
  }),
  dispatch => ({
    // causeActions: bindActionCreators(causeActions, dispatch)
  })
)(Home);
