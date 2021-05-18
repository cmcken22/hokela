import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookies from 'react-cookies';
import { withRouter } from "react-router-dom";
import { Modal, Input, Select } from 'antd';
const { Option } = Select;

import './application-modal.scss';
import * as causeActions from '../../actions/causeActions';
import * as volunteerActions from '../../actions/volunteerActions';

class ApplicationModal extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      errors: {
        first_name: false,
        last_name: false,
        email: false,
        phone: false,
        location: false
      }
    };
    this.state = {
      locationsAppliedTo: new Set(),
      initialUser: {},
      user: {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      },
      selectedLocation: null,
      ...this.defaultState
    };
  }

  componentDidMount() {
    const user = cookies.load('user');
    if (!!user) {
      this.setState({
        user,
        initialUser: user
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { user: { email } } = this.state;
    const { user: { email: prevEmail } } = prevState;
    const { active } = this.props;
    const { active: prevActive } = prevProps;

    if (email !== prevEmail && active) {
      this.checkIfUserAppliedToCause();
    }
    if (active !== prevActive && active && email) {
      this.checkIfUserAppliedToCause();
    }
  }

  checkIfUserAppliedToCause = async () => {
    const { volunteerActions, cause: { _id: causeId } } = this.props;
    const { user: { email } } = this.state;

    const { locations } = await volunteerActions.checkIfUserAppliedToCause(causeId, email);
    this.setState({ locationsAppliedTo: new Set([...locations]) });
  }

  handleApply = () => {
    const { volunteerActions, cause: { _id: causeId } } = this.props;
    const { user, selectedLocation } = this.state;
    volunteerActions.applyToCause(user, causeId, selectedLocation);
  }

  handleCancel = () => {
    const { volunteerActions } = this.props;
    volunteerActions.clearCause();
    this.setState({ errors: this.defaultState.errors });
  }

  handleChange = (e, field) => {
    const { target: { value } } = e;
    const { user } = this.state;
    let nextUser = { ...user };
    nextUser[field] = value;
    this.setState({ user: nextUser }, () => {
      cookies.save('user', nextUser, { path: '/' });
    });
  }

  handleLocationChange = (value) => {
    this.setState({ selectedLocation: value });
  }

  validateFirstName = (returnOnly = false) => {
    const { user: { first_name: firstName }, errors } = this.state;

    if (!returnOnly) {
      this.setState({
        errors: {
          ...errors,
          first_name: !firstName ? 'First name is required' : false
        }
      });
    }
    return !!firstName;
  }

  validateLastName = (returnOnly = false) => {
    const { user: { last_name: lastName }, errors } = this.state;

    if (!returnOnly) {
      this.setState({
        errors: {
          ...errors,
          last_name: !lastName ? 'Last name is required' : false
        }
      });
    }
    return !!lastName;
  }

  validateEmail = (returnOnly = false) => {
    const { user: { email }, errors } = this.state;

    if (!email) {
      if (!returnOnly) {
        this.setState({
          errors: {
            ...errors,
            email: 'Email is required'
          }
        });
      }
      return false;
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(String(email).toLowerCase());

    if (!returnOnly) {
      this.setState({
        errors: {
          ...errors,
          email: !valid ? 'Please enter a valid email' : false
        }
      });
    }
    return valid;
  }

  validateLocation = (returnOnly = false) => {
    const { selectedLocation, errors } = this.state;

    if (!returnOnly) {
      this.setState({
        errors: {
          ...errors,
          location: !selectedLocation ? 'Location is required' : false
        }
      });
    }
    return !!selectedLocation;
  }

  renderContent = () => {
    const { cause: { locations } } = this.props;
    const {
      initialUser,
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone
      },
      errors: {
        first_name: firstNameError,
        last_name: lastNameError,
        email: emailError,
        phone: phoneError,
        location: locationError
      },
      locationsAppliedTo
    } = this.state;

    return (
      <div className="apply__form">
        <div className={cx("apply__input-wrapper", {
          "apply__input-wrapper--auto-populated": initialUser.first_name === firstName
        })}>
          First name*:
          <Input
            placeholder="First name"
            value={firstName}
            onChange={(e) => this.handleChange(e, 'first_name')}
            onBlur={() => this.validateFirstName()}
          />
          {firstNameError && (
            <div className="apply__input-error">
              {firstNameError}
            </div>
          )}
        </div>
        <div className={cx("apply__input-wrapper", {
          "apply__input-wrapper--auto-populated": initialUser.last_name === lastName
        })}>
          Last name*:
          <Input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => this.handleChange(e, 'last_name')}
            onBlur={() => this.validateLastName()}
          />
          {lastNameError && (
            <div className="apply__input-error">
              {lastNameError}
            </div>
          )}
        </div>
        <div className={cx("apply__input-wrapper", {
          "apply__input-wrapper--auto-populated": initialUser.email === email
        })}>
          Email*:
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => this.handleChange(e, 'email')}
            onBlur={() => this.validateEmail()}
          />
          {emailError && (
            <div className="apply__input-error">
              {emailError}
            </div>
          )}
        </div>
        <div className={cx("apply__input-wrapper", {
          "apply__input-wrapper--auto-populated": initialUser.phone === phone
        })}>
          Phone number:
          <Input
            placeholder="Phone number"
            value={phone}
            onChange={(e) => this.handleChange(e, 'phone')}
          />
          {phoneError && (
            <div className="apply__input-error">
              {phoneError}
            </div>
          )}
        </div>

        <div className="apply__input-wrapper">
          Location*:
          <div className="apply__locations">
            <Select
              placeholder="Select a location"
              onChange={this.handleLocationChange}
              onBlur={() => this.validateLocation()}
            >
              {locations && locations.map(location => {
                const { city, province, _id: locationId } = location;
                return (
                  <Option
                    value={locationId}
                    disabled={locationsAppliedTo.has(locationId)}
                  >
                    {city.toLowerCase() === 'remote' ? city : `${city}, ${province}`}
                  </Option>
                );
              })}
            </Select>
          </div>
          {locationError && (
            <div className="apply__input-error">
              {locationError}
            </div>
          )}
        </div>
      </div>
    );
  }

  validateForm = () => {
    const firstNameValid = this.validateFirstName(true);
    const lastNameValid = this.validateLastName(true);
    const emailValid = this.validateEmail(true);
    const locationValid = this.validateLocation(true);

    return firstNameValid && lastNameValid && emailValid && locationValid;
  }

  render() {
    const { active, cause } = this.props;
    if (!active) return null;
    const valid = this.validateForm();

    return(
      <div className="apply">
        <Modal
          key={cause._id}
          title={cause.name}
          onOk={this.handleApply}
          onCancel={this.handleCancel}
          visible
          okButtonProps={{
            disabled: !valid
          }}
        >
          {this.renderContent()}
        </Modal>
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
    active: !!state.getIn(['volunteer', 'cause']),
    cause: state.getIn(['volunteer', 'cause']),
  }),
  dispatch => ({
    volunteerActions: bindActionCreators(volunteerActions, dispatch),
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(ApplicationModal));
