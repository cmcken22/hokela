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
        age: false,
        gender: false,
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
        age: '',
        gender: '',
        email: '',
        phone: '',
        location: ''
      },
      ...this.defaultState
    };
  }

  componentDidMount() {
    const user = cookies.load('user');
    if (!!user) {
      const { location, ...rest } = user;
      this.setState({
        user: rest,
        initialUser: rest
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

  handleApply = async () => {
    const { volunteerActions, cause: { _id: causeId } } = this.props;
    const { user } = this.state;
    const formValidated = await this.validateForm(false);

    if (formValidated) {
      const { location, ...rest } = user;
      volunteerActions.applyToCause(rest, causeId, location);
    }
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

  validateField = (field, text, returnOnly = false) => {
    return new Promise(resolve  => {
      const { user: { [field]: value }, errors } = this.state;

      if (!returnOnly) {
        this.setState({
          errors: {
            ...errors,
            [field]: !value || value === '' ? `${text} is required` : false
          }
        });
      }
      return resolve(!!value);
    });
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

  renderContent = () => {
    const { cause: { locations } } = this.props;
    const {
      initialUser,
      user: {
        first_name: firstName,
        last_name: lastName,
        age,
        gender,
        email,
        phone,
        location
      },
      errors: {
        first_name: firstNameError,
        last_name: lastNameError,
        age: ageError,
        gender: genderError,
        email: emailError,
        phone: phoneError,
        location: locationError
      },
      locationsAppliedTo
    } = this.state;

    return (
      <div className="apply__form">
        <div className={cx("apply__input-wrapper", {
          "apply__input-wrapper--auto-populated": !!initialUser.first_name && initialUser.first_name === firstName
        })}>
          First name*:
          <Input
            placeholder="First name"
            value={firstName}
            onChange={(e) => this.handleChange(e, 'first_name')}
            onBlur={() => this.validateField('first_name', 'First name')}
          />
          {firstNameError && (
            <div className="apply__input-error">
              {firstNameError}
            </div>
          )}
        </div>
        <div className={cx("apply__input-wrapper", {
          "apply__input-wrapper--auto-populated": !!initialUser.last_name && initialUser.last_name === lastName
        })}>
          Last name*:
          <Input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => this.handleChange(e, 'last_name')}
            onBlur={() => this.validateField('last_name', 'Last name')}
          />
          {lastNameError && (
            <div className="apply__input-error">
              {lastNameError}
            </div>
          )}
        </div>
        <div className={cx("apply__input-wrapper", {
          "apply__input-wrapper--auto-populated": !!initialUser.age && initialUser.age === age
        })}>
          Age*:
          <Input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => this.handleChange(e, 'age')}
            onBlur={() => this.validateField('age', 'Age')}
          />
          {ageError && (
            <div className="apply__input-error">
              {ageError}
            </div>
          )}
        </div>
        <div className={cx("apply__input-wrapper", {
          "apply__input-wrapper--auto-populated": !!initialUser.gender && initialUser.gender === gender
        })}>
          Gender*:
          <Select
            defaultValue={gender}
            placeholder="Select a gender"
            onChange={(e) => {
              this.handleChange({ target: { value: e } }, 'gender');
              setTimeout(() => this.validateField('gender', 'Gender'));
            }}
            onBlur={() => this.validateField('gender', 'Gender')}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
          {genderError && (
            <div className="apply__input-error">
              {genderError}
            </div>
          )}
        </div>
        <div className={cx("apply__input-wrapper", {
          "apply__input-wrapper--auto-populated": !!initialUser.email && initialUser.email === email
        })}>
          Contact Email*:
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
          "apply__input-wrapper--auto-populated": !!initialUser.phone && initialUser.phone === phone
        })}>
          Phone number:
          <Input
            placeholder="Phone number"
            value={phone}
            onChange={(e) => this.handleChange(e, 'phone')}
            onBlur={() => this.validateField('phone', 'Phone number')}
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
              onChange={(e) => {
                this.handleChange({ target: { value: e } }, 'location');
                setTimeout(() => this.validateField('location', 'Location'));
              }}
              onBlur={() => this.validateField('location', 'Location')}
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

  validateForm = (returnOnly = true) => {
    return new Promise(async resolve => {
      const firstNameValid = await this.validateField('first_name', 'First name', returnOnly);
      const lastNameValid = await this.validateField('last_name', 'Last name', returnOnly);
      const ageValid = await this.validateField('age', 'Age', returnOnly);
      const genderValid = await this.validateField('gender', 'Gender', returnOnly);
      const emailValid = await this.validateEmail(returnOnly);
      const phoneValid = await this.validateField('phone', 'Phone number', returnOnly);
      const locationValid = await this.validateField('location', 'Location', returnOnly);
  
      return resolve(
        firstNameValid && 
        lastNameValid &&
        ageValid &&
        genderValid &&
        emailValid &&
        phoneValid &&
        locationValid
      );
    });
  }

  render() {
    const { active, cause } = this.props;
    if (!active) return null;

    return(
      <div className="apply">
        <Modal
          key={cause._id}
          title={cause.name}
          onOk={this.handleApply}
          onCancel={this.handleCancel}
          visible
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
