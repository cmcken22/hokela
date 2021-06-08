import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Modal } from 'antd';

import * as causeActions from '../../actions/causeActions';
import * as volunteerActions from '../../actions/volunteerActions';
import CustomModal from '../CustomModal';

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
    const { en: { labels } } = SuccessModal.constants;
    const { cause } = this.props;

    return (
      <div className="success__content">
        <div className="success__content--left" />
        <div className="success__content--right">
          <h4>{labels.title}</h4>
          <p>{labels.messagePart1}</p>
          <p>{labels.messagePart2}</p>
        </div>
      </div>
    );
  }

  render() {
    const { en: { labels } } = SuccessModal.constants;
    const { active, cause } = this.props;
    if (!active) return null;

    return(
      <div className="success">
        <CustomModal
          key={cause._id}
          onOk={this.handleCloseModal}
          okBtnText={labels.findMoreCauses}
          onCancel={this.handleCloseModal}
          hideCancelBtn
          visible
        >
          {this.renderContent()}
        </CustomModal>
      </div>
    );
  }
}

SuccessModal.constants = {
  en: {
    labels: {
      findMoreCauses: "Find more causes",
      title: "Thank you for applying for the Social Media & Blog Writer position!",
      messagePart1: "Your application will be sent to Green Future for review.",
      messagePart2: "In the meantime, check out our other causes!",
    }
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
