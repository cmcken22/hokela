import React, { Component } from 'react'
import cx from 'classnames';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as modalActions from 'Actions/modalActions';
import CustomModal from '../CustomModal';
import ContactUsModal from 'Components/ContactUsModal';

class ModalController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeModal = () => {
    const { modalActions } = this.props;
    modalActions.toggleModal('', false);
  }

  sendUserHome = () => {
    const { history } = this.props;
    this.closeModal();
    history.push('/');
  }

  render() {
    const { activeModal } = this.props;

    return (
      <div className="modal-controller">
        <ContactUsModal
          visible={activeModal === 'contact-us'}
          onCancel={this.closeModal}
        />
        <CustomModal
          className="contact-us-success"
          visible={activeModal === 'contact-us-success'}
          onOk={this.sendUserHome}
          onCancel={this.closeModal}
          hideCancelBtn
          okBtnText="Back to home"
        >
          <div className="contact-us-success__container">
            <div className="contact-us-success__image" />
            <div className="contact-us-success__content">
              <h4>Thank you for contacting us!</h4>
              <p>We have received your message and we will reply as soon as possible.</p>

              <div className="contact-us-success__sub-content">
                <p>Let's connect!</p>
                <div className="contact-us-success__icons">
                  <div className="contact-us-success__icon contact-us-success__icon--facebook" />
                  <div className="contact-us-success__icon contact-us-success__icon--instagram" />
                  <div className="contact-us-success__icon contact-us-success__icon--linkedIn" />
                </div>
              </div>
            </div>
          </div>
        </CustomModal>
      </div>
    );
  }
}

ModalController.constants = {
  en: {
    labels: {}
  },
};

export default connect(
  state => ({
    activeModal: state.getIn(['modal', 'activeModal'])
  }),
  dispatch => ({
    modalActions: bindActionCreators(modalActions, dispatch)
  })
)(withRouter(ModalController));
