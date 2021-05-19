import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import { Row, Col } from '../Grid';
// import * as causeActions from '../../actions/causeActions';
// import * as filterActions from '../../actions/filterActions';
import BreadCrumbs from '../BreadCrumbs';
import Page from '../Page';
import './about-us.scss';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <Page>
        <>
          <div className="about">
            <BreadCrumbs crumbs={[{ name: 'About us' }]} />
            <Row>
              <Col span={12}>
                <h1>
                  About us
                </h1>
              </Col>
            </Row>
          </div>
        </>
      </Page>
    );
  }
}

AboutUs.constants = {
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
)(withRouter(AboutUs));
