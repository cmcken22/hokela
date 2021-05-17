import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Modal, Button } from 'antd';
import './application-modal.scss';

import { Row, Col } from '../Grid';

import * as causeActions from '../../actions/causeActions';
import * as volunteerActions from '../../actions/volunteerActions';
import Page from '../Page';

class ApplicationModal extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {};
    this.state = {
      ...this.defaultState,
    };
  }

  handleApply = () => {
    const { volunteerActions } = this.props;
    volunteerActions.setCauseId(null);    
  }

  handleCancel = () => {
    const { volunteerActions } = this.props;
    volunteerActions.setCauseId(null);
  }

  render() {
    const { active } = this.props;
    if (!active) return null;

    return(
      <div className="apply">
        <Modal
          title="Apply to Cause"
          onOk={this.handleApply}
          onCancel={this.handleCancel}
          visible
        />
      </div>
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
    volunteerActions: bindActionCreators(volunteerActions, dispatch),
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(ApplicationModal));
