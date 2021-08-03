import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import { Row, Col } from 'Components/Grid';
import BreadCrumbs from 'Components/BreadCrumbs';
import Page from 'Components/Page';
import Intro from './Intro';
import HaveSomeQuestions from './HaveSomeQuestions';
import WhyChooseHokela from './WhyChooseHokela';

class FindVolunteers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  renderHeader = () => {
    return (
      <div className="find__header">
        <BreadCrumbs crumbs={[{ name: 'Find Volunteers' }]} />
        <Row>
          <Col span={12}>
            <h1>
              Find Volunteers
            </h1>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return(
      <Page>
        <Page.Header
          title="Find Volunteers"
          breadCrums={[{ name: "Find Volunteers" }]}
        />
        <Page.Section first>
          <Intro />
        </Page.Section>
        <Page.Section
          title="Why Choose Hokela?"
          dark
        >
          <WhyChooseHokela />
        </Page.Section>
        <Page.Section darkGradient>
          <HaveSomeQuestions />
        </Page.Section>
      </Page>
    );
  }
}

FindVolunteers.constants = {
  en: {
    labels: {}
  }
};

export default connect(
  state => {
    // const currentPage = state.getIn(['causes', 'ALL', 'currentPage']);
    return ({
      // currentPage,
      // userInfo: state.get('user'),
      // email: state.getIn(['user', 'email']),
      // isAdmin: state.getIn(['user', 'isAdmin']),
      // pages: state.getIn(['causes', 'ALL', 'pages']),
      // causes: state.getIn(['causes', 'ALL', 'pages', currentPage, 'docs']),
      // nextPageToken: state.getIn(['causes', 'ALL', 'pages', currentPage, 'nextPageToken']),
      // metaData: state.getIn(['causes', 'ALL', 'pages', currentPage, 'metaData']),
      // mobile: state.getIn(['app', 'mobile']),
      // filter: state.get('filter'),
      // loadingCauses: state.getIn(['loading', causeActions.INIT_CAUSES])
    })
  },
  dispatch => ({
    // causeActions: bindActionCreators(causeActions, dispatch),
    // filterActions: bindActionCreators(filterActions, dispatch)
  })
)(withRouter(FindVolunteers));
