import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookies from 'react-cookies';
import { withRouter } from "react-router-dom";
import { Modal, Input, Select } from 'antd';
const { Option } = Select;

import './failure-modal.scss';
import * as causeActions from '../../actions/causeActions';
import * as volunteerActions from '../../actions/volunteerActions';

class FailureModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCloseModal = () => {
    const { volunteerActions } = this.props;
    volunteerActions.clearFailedCause();
  }

  renderContent = () => {
    const { cause } = this.props;

    return (
      <div className="failure__content">
        <p>Applying to {cause.name} failed!</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  render() {
    const { active, cause } = this.props;
    if (!active) return null;

    return(
      <div className="failure">
        <Modal
          key={cause._id}
          title={cause.name}
          onOk={this.handleCloseModal}
          onCancel={this.handleCloseModal}
          visible
        >
          {this.renderContent()}
        </Modal>
      </div>
    );
  }
}

FailureModal.constants = {
  en: {
    labels: {}
  },
};

export default connect(
  state => ({
    active: !!state.getIn(['volunteer', 'failedCause']),
    cause: state.getIn(['volunteer', 'failedCause']),
  }),
  dispatch => ({
    volunteerActions: bindActionCreators(volunteerActions, dispatch),
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(FailureModal));
