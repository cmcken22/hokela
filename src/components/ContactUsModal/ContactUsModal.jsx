import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as modalActions from 'Actions/modalActions';
import ContactUsForm from 'Forms/ContactUsForm';
import CustomModal from 'Components/CustomModal';


class ContactUsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false
    };
  }

  createApi = (api) => {
    this.modalApi = api;
    this.validateFields();
  }

  validateFields = () => {
    if (!this.modalApi) return;

    const { validateFields } = this.modalApi;
    if (validateFields) {
      const validated = validateFields();
      this.setState({ validated });
    }
  }

  handleChange = () => {
    this.validateFields();
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) onCancel();
  }

  handleSubmit = () => {
    if (!this.modalApi) return;

    const { handleSubmit } = this.modalApi;
    if (handleSubmit) handleSubmit();
  }

  render() {
    const { validated } = this.state;
    const { visible } = this.props;

    return (
      <CustomModal
        title="Contact us"
        visible={visible}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
        okButtonProps={{
          disabled: !validated
        }}
      >
        <ContactUsForm
          createApi={this.createApi}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          hideSubmit
        />
      </CustomModal>
    );
  }
}

ContactUsModal.constants = {
  en: {
    labels: {}
  },
};

export default ContactUsModal;
