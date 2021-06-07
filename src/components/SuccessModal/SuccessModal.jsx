import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Modal } from 'antd';

import * as causeActions from '../../actions/causeActions';
import * as volunteerActions from '../../actions/volunteerActions';

class SuccessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCloseModal = () => {
    const { volunteerActions } = this.props;
    volunteerActions.clearSuccessfulCause();
  }

  renderContent = () => {
    const { cause } = this.props;

    return (
      <div className="success__content">
        <p>You have successfully applied to {cause.name}!</p>
      </div>
    );
  }

  render() {
    const { active, cause } = this.props;
    if (!active) return null;

    return(
      <div className="success">
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

SuccessModal.constants = {
  en: {
    labels: {}
  },
};

export default connect(
  state => ({
    active: !!state.getIn(['volunteer', 'successfullCause']),
    cause: state.getIn(['volunteer', 'successfullCause']),
  }),
  dispatch => ({
    volunteerActions: bindActionCreators(volunteerActions, dispatch),
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(SuccessModal));
