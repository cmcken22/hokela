import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as volunteerActions from 'Actions/volunteerActions';
import * as modalActions from 'Actions/modalActions';

import Input from 'Components/Input';
import TextArea from 'Components/Input/TextArea';
import Button from 'Components/Button';
import { validateEmail } from 'Utils';

class ContactUsForm extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      name: '',
      email: '',
      message: '',
      disabled: false,
      errors: {
        email: '',
      }
    };
    this.state = {
      ...this.defaultState
    };
    this.api = {
      handleSubmit: this.handleSubmit,
      validateFields: this.validateFields
    };
  }

  componentDidMount() {
    const { createApi } = this.props;
    if (createApi) createApi(this.api);
  }

  updateValue = (field, e) => {
    const { onChange } = this.props;
    const { errors } = this.state;
    const { target: { value } } = e;

    this.setState({ [field]: value }, () => {
      if (field === 'email' && !!errors.email) this.handleEmailBlur();
      if (onChange) onChange();
    });
  }
  
  handleEmailBlur = () => {
    const { email, errors } = this.state;
    const emailValid = validateEmail(email);

    if (!emailValid) {
      this.setState({
        errors: {
          ...errors,
          email: 'Please enter a valid email.'
        }
      });
    } else {
      this.setState({
        errors: {
          ...errors,
          email: ''
        }
      });
    }
  }

  validateFields = () => {
    const { name, email, message } = this.state;
    if (!name || !email || !message) return false;
    if (!validateEmail(email)) return false;
    return true;
  }

  handleSubmit = () => {
    const { volunteerActions, modalActions } = this.props;
    const { name, email, message } = this.state;
    if (!this.validateFields()) return;

    this.setState({ disabled: true }, async () => {
      const res = await volunteerActions.sendContactUsEmail(name, email, message);
      if (res) {
        this.resetForm();
        modalActions.toggleModal('contact-us-success');
      }
      // else TODO: notify user of failure to send email
    });
  }

  resetForm = () => {
    this.setState({ ...this.defaultState });
  }

  render() {
    const { en: { labels } } = ContactUsForm.constants;
    const { name, email, message, disabled, errors } = this.state;
    const { hideSubmit } = this.props;

    return (
      <div className="contact-us-form">
        <h4>{labels.title}</h4>

        <Input
          title={labels.name}
          value={name}
          onChange={(e) => this.updateValue("name", e)}
          disabled={disabled}
        />
        <Input
          title={labels.email}
          placeholder={labels.emailPlaceholder}
          value={email}
          onChange={(e) => this.updateValue("email", e)}
          disabled={disabled}
          onBlur={this.handleEmailBlur}
          error={errors.email}
        />
        <TextArea
          title={labels.message}
          placeholder={labels.messagePlaceholder}
          value={message}
          onChange={(e) => this.updateValue("message", e)}
          disabled={disabled}
        />
        {!hideSubmit && (
          <Button
            onClick={this.handleSubmit}
            caseSensitive
            disabled={!this.validateFields() || disabled}
          >
            {labels.submit}
          </Button>
        )}
      </div>
    );
  }
}

ContactUsForm.constants = {
  en: {
    labels: {
      title: "Send us a message",
      name: "Name",
      email: "Email address",
      emailPlaceholder: "email@example.com",
      message: "Message",
      messagePlaceholder: "Write your message here",
      submit: "Submit"
    }
  }
};

export default connect(
  state => ({
    mobile: state.getIn(['app', 'mobile']),
  }),
  dispatch => ({
    volunteerActions: bindActionCreators(volunteerActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch)
  })
)(ContactUsForm);
