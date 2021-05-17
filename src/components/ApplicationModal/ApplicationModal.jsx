import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import './application-modal.scss';

import { Row, Col } from '../Grid';

import * as causeActions from '../../actions/causeActions';
import * as appActions from '../../actions/appActions';
import Page from '../Page';

class ApplicationModal extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {};
    this.state = {
      ...this.defaultState,
    };
  }

  render() {
    const { active } = this.props;
    if (!active) return null;

    return(
      <Page className="apply">
        <Row>
          <Col span={12}>
            HELLO
            </Col>
        </Row>
      </Page>
    );
  }
}

ApplicationModal.constants = {
  en: {
    labels: {}
  },
};

export default connect(
  state => ({
    active: !!state.getIn(['volunteer', 'causeId']),
    causeId: state.getIn(['volunteer', 'causeId']),
  }),
  dispatch => ({
    // bannerActions: bindActionCreators(bannerActions, dispatch),
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(ApplicationModal));
