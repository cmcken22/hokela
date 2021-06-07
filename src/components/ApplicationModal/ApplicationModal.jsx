import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookies from 'react-cookies';
import { withRouter } from "react-router-dom";
// import { Radio } from 'antd';

import './application-modal.scss';
import { saveCookie } from '../../utils';
import * as causeActions from '../../actions/causeActions';
import * as volunteerActions from '../../actions/volunteerActions';
import CustomModal from '../CustomModal';
import Input from '../Input';
import TextArea from '../Input/TextArea';
import Radio from '../Input/Radio';
import Select from '../Select';

class ApplicationModal extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      errors: {
        first_name: false,
        last_name: false,
        age_group: false,
        gender: false,
        email: false,
        phone: false,
        location: false
      }
    };
    this.state = {
      locationsAppliedTo: new Set(),
      alreadyApplied: false,
      initialUser: {},
      user: {
        first_name: '',
        last_name: '',
        age_group: '',
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
      const { location, additional_info, ...rest } = user;
      this.setState({
        user: rest,
        initialUser: rest
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { user: { email } } = this.state;
    const { user: { email: prevEmail } } = prevState;
    const { active, cause } = this.props;
    const { active: prevActive, cause: prevCause } = prevProps;

    if (active !== prevActive && active && email) {
      this.checkIfUserAppliedToCause();
    }
    if (cause !== prevCause && !!cause) {
      this.preSelectLocation();
    }
  }

  preSelectLocation = () => {
    const { user } = this.state;
    const { cause: { locations } } = this.props;

    if (locations && locations.length === 1) {
      const selectedLocation = locations[0]._id;
      this.setState({
        user: {
          ...user,
          location: selectedLocation
        }
      });
    }
  }

  checkIfUserAppliedToCause = () => {
    return new Promise(async (resolve) => {
      const { volunteerActions, cause: { _id: causeId } } = this.props;
      const { user: { email } } = this.state;
  
      const { locations, appliedAll } = await volunteerActions.checkIfUserAppliedToCause(causeId, email);
      this.setState({
        locationsAppliedTo: new Set([...locations]),
        alreadyApplied: appliedAll
      });

      this.setState({
        errors: {
          ...this.state.errors,
          email: appliedAll ? 'You have already applied to this cause.' : false
        }
      });
      return resolve(appliedAll);
    })
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
    const { user } = this.state;
    const { volunteerActions } = this.props;
    volunteerActions.clearCause();
    this.setState({
      errors: this.defaultState.errors,
      user: {
        ...user,
        location: null
      }
    });
  }

  handleChange = (e, field) => {
    const { target: { value } } = e;
    const { user } = this.state;

    let nextUser = { ...user };
    nextUser[field] = value;
    this.setState({ user: nextUser }, () => {
      const { location, additional_info, ...rest } = nextUser;
      saveCookie('user', rest);
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
            email: 'Required'
          }
        });
      }
      return false;
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(String(email).toLowerCase());

    if (!returnOnly && !valid) {
      this.setState({
        errors: {
          ...errors,
          email: 'Please enter a valid email'
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
        age_group: ageGroup,
        email,
        phone,
        location
      },
      errors: {
        first_name: firstNameError,
        last_name: lastNameError,
        age_group: ageGroupError,
        gender: genderError,
        email: emailError,
        phone: phoneError,
        location: locationError
      },
      locationsAppliedTo
    } = this.state;

    const locationOptions = locations ? locations.map(location => {
      const { city, province, _id: locationId } = location;
      const title = city.toLowerCase() === 'remote' ? city : `${city}, ${province}`;
      return ({
        title,
        value: locationId,
        disabled: locationsAppliedTo.has(locationId)
      })
    }) : [];

    console.clear();
    console.log('locationOptions:', locationOptions);

    const ageGroupOptions = [
      {
        title: 'Youth (13 - 17)',
        value: 'Youth (13 - 17)'
      },
      {
        title: 'Adult (18+)',
        value: 'Adult (18+)'
      }
    ];

    return (
      <div className="apply__form">
        <Input
          title="First name"
          value={firstName}
          autoPopulated={!!initialUser.first_name && initialUser.first_name === firstName}
          onChange={(e) => this.handleChange(e, 'first_name')}
          onBlur={() => this.validateField('first_name', 'First name')}
          error={firstNameError && 'Required'}
        />
        <Input
          title="Last name"
          value={lastName}
          autoPopulated={!!initialUser.last_name && initialUser.last_name === lastName}
          onChange={(e) => this.handleChange(e, 'last_name')}
          onBlur={() => this.validateField('last_name', 'Last name')}
          error={lastNameError && 'Required'}
        />
        <Input
          title="Email"
          value={email}
          autoPopulated={!!initialUser.email && initialUser.email === email}
          onChange={(e) => this.handleChange(e, 'email')}
          onBlur={() => {
            this.checkIfUserAppliedToCause();
            this.validateEmail();
          }}
          error={emailError}
        />
        <Input
          title="Phone number"
          value={phone}
          autoPopulated={!!initialUser.phone && initialUser.phone === phone}
          onChange={(e) => this.handleChange(e, 'phone')}
          onBlur={() => this.validateField('phone', 'Phone number')}
          error={phoneError && 'Required'}
        />
        <Select
          title="Age group"
          placeholder="Choose"
          tooltip="Some positions have minimum age requirements. This information is used to ensure that this role is suitable for you."
          options={ageGroupOptions}
          value={ageGroup}
          autoPopulated={!!initialUser.age_group && initialUser.age_group === ageGroup}
          onChange={(e) => {
            this.handleChange({ target: { value: e } }, 'age_group');
            setTimeout(() => this.validateField('age_group', 'Age Group'));
          }}
          onBlur={() => this.validateField('age_group', 'Age Group')}
          error={ageGroupError && 'Required'}
        />
        <Select
          title="Where would you like to volunteer?"
          placeholder="Choose"
          value={location}
          options={locationOptions}
          disabled={locationOptions && locationOptions.length === 1}
          onChange={(e) => {
            this.handleChange({ target: { value: e } }, 'location');
            setTimeout(() => this.validateField('location', 'Location'));
          }}
          onBlur={() => this.validateField('location', 'Location')}
          error={locationError && 'Required'}
        />
      </div>
    );
  }

  renderSurvey = () => {
    const {
      user: {
        found_by: foundBy
      },
      errors: {
        found_by: foundByError
      },
    } = this.state;

    const foundByOptions = [
      {
        title: 'Search engine (Google, etc.)',
        value: 'Search Engine'
      },
      {
        title: 'Recommended by a friend or colleague',
        value: 'Friend/Colleague'
      },
      {
        title: 'Social media (Facebook, Instagram, etc.)',
        value: 'Social Media'
      },
      {
        title: 'Blog or publication',
        value: 'Blog/Publication'
      },
      {
        title: 'Other',
        value: 'Other'
      },
    ];

    return (
      <div className="apply__input-wrapper">
        <Radio
          title="How did you hear about Hokela?"
          value={foundBy}
          options={foundByOptions}
          onChange={(e) => this.handleChange(e, 'found_by')}
          error={foundByError && 'Required'}
        />
      </div>
    );
  }

  renderAddtionalInfo = () => {
    const {
      user: {
        additional_info: additionalInfo
      }
    } = this.state;

    return (
      <TextArea
        title="Any additional information you would like us to know? (Optional)"
        placeholder="E.g. Availability, allergies, other form of contact, etc."
        value={additionalInfo}
        onChange={(e) => this.handleChange(e, 'additional_info')}
      />
    );
  }

  validateForm = (returnOnly = true) => {
    return new Promise(async resolve => {
      const alreadyApplied = await this.checkIfUserAppliedToCause();
      const firstNameValid = await this.validateField('first_name', 'First name', returnOnly);
      const lastNameValid = await this.validateField('last_name', 'Last name', returnOnly);
      const ageGroupValid = await this.validateField('age_group', 'Age Group', returnOnly);
      const emailValid = await this.validateEmail(returnOnly);
      const phoneValid = await this.validateField('phone', 'Phone number', returnOnly);
      const locationValid = await this.validateField('location', 'Location', returnOnly);
      const foundByValid = await this.validateField('found_by', 'Field', returnOnly);

      return resolve(
        !alreadyApplied &&
        firstNameValid && 
        lastNameValid &&
        ageGroupValid &&
        emailValid &&
        phoneValid &&
        locationValid &&
        foundByValid
      );
    });
  }

  render() {
    const { alreadyApplied } = this.state;
    const { active, cause } = this.props;
    if (!active) return null;

    return(
      <div className="apply">
        <CustomModal
          title={cause.name}
          subTitle={cause.organization}
          visible
          key={cause._id}
          onOk={this.handleApply}
          okBtnText="Apply"
          onCancel={this.handleCancel}
          cancelBtnText="Cancel"
          okButtonProps={{
            disabled: alreadyApplied
          }}
        >
          {this.renderContent()}
          {this.renderAddtionalInfo()}
          {this.renderSurvey()}
        </CustomModal>
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
    cause: state.getIn(['volunteer', 'cause'])
  }),
  dispatch => ({
    volunteerActions: bindActionCreators(volunteerActions, dispatch),
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(ApplicationModal));
