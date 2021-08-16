import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as modalActions from 'Actions/modalActions';
import CustomModal from '../CustomModal';
import ContactUsForm from 'Forms/ContactUsForm';

class ModalController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeModal = () => {
    const { modalActions } = this.props;
    modalActions.toggleModal('', false);
  }

  render() {
    const { activeModal } = this.props;

    console.clear();
    console.log('activeModal:', activeModal);

    return (
      <div className="modal-controller">
        <CustomModal
          title="Contact us"
          visible={activeModal === 'contact-us'}
          onCancel={this.closeModal}
        >
          <ContactUsForm />
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
)(ModalController);
