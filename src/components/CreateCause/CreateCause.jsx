import React, { Component } from 'react'
import axios from 'axios';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { fromJS } from 'immutable';
import { List } from 'immutable';
import shortid from 'shortid';
import { Input } from 'antd';

import "./create-cause.scss";
import { Row, Col } from '../Grid';
import Page from '../Page';
import * as causeActions from '../../actions/causeActions';
import Button from '../Button';
import { getBaseHeader } from '../../utils';
import TypeAhead from '../TypeAhead';
import Editor from '../Editor';
import MultiSelect from '../MultiSelect';

class CreateCause extends Component {
  constructor(props) {
    super(props);
    this.defaultCauseState = {
      name: "",
      organization: "",
      locations: "",
      image_link: "",
      logo_link: "",
      sections: []
    };
    this.state = {
      newCause: {
        ...this.defaultCauseState
      },
      images: [],
      logos: [],
      organizations: [],
      locations: [],
      addCause: false,
      displayForm: false,
      formId: shortid.generate(),
    };
  }

  componentDidMount() {
    const { causeId, updating } = this.props;

    if (causeId && updating) return this.loadCause();
    else this.populateSections();
    this.getImages();
  }

  loadCause = async () => {
    const { causeActions, causeId } = this.props;
    const cause = await causeActions.getCauseById(causeId);
    this.setState({ newCause: cause }, () => {
      this.getImages();
      this.getContactInfo();
      if (!cause.sections || !cause.sections.length) {
        this.populateSections();
      }
    });
  }

  populateSections = () => {
    const { newCause } = this.state;
    let sections = [];
    sections.push({ title: "About the position" });
    sections.push({ title: "The right fit" });
    sections.push({ title: "About the organization" });
    sections.push({ title: "Impact" });
    const nextCause = {
      ...newCause,
      sections
    };
    this.setState({ newCause: nextCause });
  }

  disaplyForm = () => {
    const { displayForm } = this.state;
    this.setState({ displayForm: !displayForm, formId: shortid.generate() });
  }

  handleChange = (e, fieldName) => {
    const { target: { value } } = e;
    const { newCause } = this.state;
    const nextNewCause = {
      ...newCause,
      [fieldName]: value
    };

    this.setState({ newCause: nextNewCause }, () => {
      if (fieldName === 'organization') {
        this.getImages();
        this.getContactInfo();
      }
    });
  }

  handleImageChange = (value, type) => {
    const {
      newCause: {
        [type]: currentValue
      }
    } = this.state;

    let nextValue = value;
    if (currentValue === nextValue) nextValue = '';
    this.handleChange({ target: { value: nextValue } }, type);
  }

  checkDisabled = () => {
    const { name, description, addCause } = this.state;
    if (!addCause) return false;
    if (!name || !description) return true;
    return false;
  }

  handleUpdateCause = () => {
    const { causeActions, causeId, history } = this.props;
    const { newCause } = this.state;
    console.clear();
    console.log('handleUpdateCause:', newCause);

    causeActions.updateCause(causeId, newCause).then(res => {
      console.log('res:', res);
      if (newCause) this.resetForm();
      causeActions.getCauses();
      setTimeout(() => history.push(`/causes/${causeId}`));
    });
  }

  handleAddCause = () => {
    const { causeActions } = this.props;
    const { newCause } = this.state;
    console.clear();
    console.log('newCause:', newCause);
    causeActions.addCause(newCause).then(res => {
      console.log('res:', res);
      if (newCause) this.resetForm();
      causeActions.getCauses();
      setTimeout(() => history.push(`/causes/${res._id}`));
    });
  }

  handleDelete = (id) => {
    const { causeActions } = this.props;
    causeActions.deleteCause(id);
  }

  resetForm = () => {
    const { causeActions } = this.props;
    this.setState({
      newCause: { ...this.defaultCauseState },
      images: [],
      logos: []
    }, () => {
      this.getImages();
      causeActions.getTypeAheadOptions();
    });
  }

  getImages = () => {
    const { newCause: { organization } } = this.state;

    axios.get(`${process.env.API_URL}/cause-api/v1/causes/images?org=${organization}`, getBaseHeader())
      .then(res => {
        console.log('res:', res);
        if (res.status === 200) {
          const { data } = res;
          console.log('data:', data);
          this.setState({ images: data });
        }
      })
      .catch(err => {
        console.log('err:', err);
        this.setState({ images: [] });
      });

    axios.get(`${process.env.API_URL}/cause-api/v1/causes/logos?org=${organization}`, getBaseHeader())
      .then(res => {
        console.log('res:', res);
        if (res.status === 200) {
          const { data } = res;
          console.log('data:', data);
          this.setState({ logos: data });
        }
      })
      .catch(err => {
        console.log('err:', err);
        this.setState({ logos: [] });
      });
  }

  getContactInfo = () => {
    const { newCause } = this.state;
    const { organization } = newCause;

    axios.get(`${process.env.API_URL}/cause-api/v1/causes/contact?organization=${organization}`, getBaseHeader())
      .then(res => {
        console.clear();
        console.log('res:', res);
        if (res.status === 200) {
          const { data } = res;
          console.log('data:', data);
          const [contact] = data;
          this.setState({
            newCause: {
              ...newCause,
              contact
            },
          });
        } else {
          this.setState({
            newCause: {
              ...newCause,
              contact: {}
            }
          });
        }
      })
      .catch(err => {
        console.log('err:', err);
        this.setState({
          newCause: {
            ...newCause,
            contact: {}
          }
        });
      });
  }

  handleFiles = async (files, type) => {
    const { causeActions } = this.props;
    const { newCause: { organization } } = this.state;
    const typeMap = {
      image_link: 'images',
      logo_link: 'logos'
    };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const res = await causeActions.uploadFile(file, organization, typeMap[type]);
      if (res) {
        this.handleChange({ target: { value: res } }, type);
      }
    }
    this.getImages();
  }

  renderImages = (type) => {
    const typeMap = {
      image_link: 'images',
      logo_link: 'logos'
    };
    const {
      [typeMap[type]]: images,
      newCause: {
        [type]: linkType,
        organization
      }
    } = this.state;

    return (
      <>
        <Row>
          <Col span={12}>
            <div className="create__images">
              {images && images.map(image => {
                const URL = `https://storage.googleapis.com/hokela-bucket/${image}`;
                return (
                  <div key={`image--${image}`} className="create__image-wrapper">
                    <div
                      className="create__image"
                      onClick={() => this.handleImageChange(URL, type)}
                      style={{ backgroundImage: `url('${URL}')` }}
                    />
                    {linkType === URL && (
                      <div className="create__selected-icon"/>
                    )}
                  </div>
                )
              })}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <input
              type="file"
              className="file-upload__fileElem"
              multiple
              accept="image/png, image/jpeg"
              onChange={(e) => this.handleFiles(e.target.files, type)}
              disabled={!organization}
            />
          </Col>
        </Row>
      </>
    );
  }

  handleAddLocation = () => {
    const { newCause } = this.state;
    const { locations } = newCause;
    const nextLocations = [...locations];

    nextLocations.push({
      city: '',
      province: '',
      country: '',
    });

    this.setState({
      newCause: {
        ...newCause,
        locations: nextLocations
      }
    });
  }

  handleDeleteLocation = (index) => {
    const { newCause } = this.state;
    const { locations } = newCause;
    const nextLocations = [...locations];
    nextLocations.splice(index, 1);

    this.setState({
      newCause: {
        ...newCause,
        locations: nextLocations
      }
    });
  }

  handleLocationChange = (e, field, index) => {
    const { target: { value } } = e;
    const { newCause } = this.state;
    const { locations } = newCause;
    const nextLocations = [...locations];
    nextLocations[index] = {
      ...nextLocations[index],
      [field]: value
    };

    this.setState({
      newCause: {
        ...newCause,
        locations: nextLocations
      }
    });
  }

  renderLocations = () => {
    const { newCause: { locations } } = this.state;
    const { cities, provinces, countries } = this.props;

    return (
      <div className="create__locations">
        <Row>
          <Col span={6}>
            Locations: *
          </Col>
        </Row>
        {locations && locations.map((location, i) => {
          const { city, province, country } = location;

          return (
            <div className="create__location-row">
              <div
                onClick={() => this.handleDeleteLocation(i)}
                className="create__delete-location-btn"
              >
                &times;
              </div>
              <Row>
                <Col span={6}>
                  City: *
                  <TypeAhead
                    value={city}
                    options={cities && cities.toJS()}
                    onChange={(e) => this.handleLocationChange(e, "city", i)}
                  />
                </Col>
              </Row>
              {city && city.toLowerCase() !== 'remote' && (
                <>
                  <Row>
                    <Col span={6}>
                      Province: *
                      <TypeAhead
                        value={province}
                        options={provinces && provinces.toJS()}
                        onChange={(e) => this.handleLocationChange(e, "province", i)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      Country: *
                      <TypeAhead
                        value={country}
                        options={countries && countries.toJS()}
                        onChange={(e) => this.handleLocationChange(e, "country", i)}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </div>
          );
        })}
        <Row>
          <Col span={6}>
            <Button
              onClick={this.handleAddLocation}
            >
              Add Location
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  handleAddSection = () => {
    const { newCause } = this.state;
    const { sections } = newCause;
    const nextSections = [...sections];

    const titleMap = {
      0: "About the position",
      1: "The right fit",
      2: "About the organization",
      3: "mpact"
    };

    nextSections.push({
      title: titleMap[sections.length] ? titleMap[sections.length] : 'Placeholder...',
      description: '',
    });

    this.setState({
      newCause: {
        ...newCause,
        sections: nextSections
      }
    });
  }

  handleDeleteSection = (index) => {
    const { newCause } = this.state;
    const { sections } = newCause;
    const nextSections = [...sections];
    nextSections.splice(index, 1);

    this.setState({
      newCause: {
        ...newCause,
        sections: nextSections
      }
    });
  }

  handleSectionChange = (e, field, index) => {
    const { target: { value } } = e;
    const { newCause } = this.state;
    const { sections } = newCause;
    const nextSections = [...sections];
    nextSections[index] = {
      ...nextSections[index],
      [field]: value
    };

    this.setState({
      newCause: {
        ...newCause,
        sections: nextSections
      }
    });
  }

  renderSections = () => {
    const { newCause: { sections } } = this.state;

    return (
      <div className="create__locations">
        <Row>
          <Col span={6}>
            Sections: *
          </Col>
        </Row>
        {sections && sections.map((section, i) => {
          const { title, description } = section;
          return (
            <div
              key={`section--${i}`}
              className="create__location-row"
            >
              <div
                onClick={() => this.handleDeleteSection(i)}
                className="create__delete-location-btn"
              >
                &times;
              </div>
              <Row>
                <Col span={12}>
                  Title:
                  <Input
                    value={title}
                    onChange={(e) => this.handleSectionChange(e, "title", i)}
                  />
                  Description:
                  <Editor
                    key={`section__editor--${i}`}
                    value={description}
                    onChange={(value) => this.handleSectionChange({ target: { value } }, 'description', i)}
                  />
                </Col>
              </Row>
            </div>
          );
        })}
        <Row>
          <Col span={6}>
            <Button
              onClick={this.handleAddSection}
            >
              Add Section
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  handleContactChange = (e, field) => {
    const { target: { value } } = e;
    const { newCause } = this.state;
    const { contact } = newCause;
    const nextContact = { ...contact };
    nextContact[field] = value;

    this.setState({
      newCause: {
        ...newCause,
        contact: nextContact
      }
    });
  }

  renderContactInfo = () => {
    const { newCause: { contact, organization } } = this.state;
    const { name, email, phone, address, website } = contact || {};
    const disabled = !organization;

    return (
      <div className="create__locations">
        <div className="create__location-row">
          <Row>
            <Col span={12}>
              Contact Name:
              <Input
                value={name}
                onChange={(e) => this.handleContactChange(e, "name")}
                disabled={disabled}
              />
              Contact Email:
              <Input
                value={email}
                onChange={(e) => this.handleContactChange(e, "email")}
                disabled={disabled}
              />
              Contact Number:
              <Input
                value={phone}
                onChange={(e) => this.handleContactChange(e, "phone")}
                disabled={disabled}
              />
              Contact Address:
              <Input
                value={address}
                onChange={(e) => this.handleContactChange(e, "address")}
                disabled={disabled}
              />
              Contact Website:
              <Input
                value={website}
                onChange={(e) => this.handleContactChange(e, "website")}
                disabled={disabled}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  handleSelectAllDays = (e) => {
    const { newCause } = this.state;
    const { days: allDays } = this.props;
    const { target: { checked } } = e;

    let nextDays = [];
    if (checked) {
      nextDays = !!allDays ? allDays.toJS() : [];
    }

    this.setState({
      newCause: {
        ...newCause,
        days: nextDays
      }
    });
  }

  handleSelectDay = (e, day) => {
    const { newCause } = this.state;
    const { days } = newCause;
    const { target: { checked } } = e;

    let nextDays = [];
    if (!!days && Array.isArray(days)) {
      nextDays = [...days];
    }

    if (checked) {
      nextDays.push(day);
    } else {
      const index = nextDays.indexOf(day);
      nextDays.splice(index, 1);
    }

    const sorter = {
      "sunday": 0,
      "monday": 1,
      "tuesday": 2,
      "wednesday": 3,
      "thursday": 4,
      "friday": 5,
      "saturday": 6
    }
    
    const sortedDays = nextDays.sort((a, b) => {
      let day1 = a.toLowerCase();
      let day2 = b.toLowerCase();
      return sorter[day1] - sorter[day2];
    });

    this.setState({
      newCause: {
        ...newCause,
        days: sortedDays
      }
    });
  }

  renderOverviewInfo = () => {
    const {
      newCause: {
        sector,
        time_of_day: timeOfDay,
        days,
        hours,
        duration,
        ages
      }
    } = this.state;

    const {
      sectors: allSectors,
      timeOfDays: allTimeOfDays,
      days: allDays,
      hours: allHours,
      durations: allDurations,
      ages: allAges,
    } = this.props;

    console.clear();
    console.log('days:', days);

    return (
      <div className="create__locations">
        <div className="create__location-row">
          <Row>
            <Col span={6}>
              Sector:
              <TypeAhead
                value={sector}
                options={allSectors && allSectors.toJS()}
                onChange={(e) => this.handleChange(e, "sector")}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              Days:
              <div className="create__check-boxes">
                <div className="create__check-box-option">
                  <input
                    type="checkbox"
                    id="All"
                    name="All"
                    value="All"
                    onChange={(e) => this.handleSelectAllDays(e)}
                    checked={days && days.length === 7}
                  />
                  <label for="All">Select All</label>
                </div>
                {allDays && allDays.map(day => {
                  return (
                    <div className="create__check-box-option">
                      <input
                        type="checkbox"
                        id={day}
                        name={day}
                        value={day}
                        onChange={(e) => this.handleSelectDay(e, day)}
                        checked={days && days.indexOf(day) !== -1}
                      />
                      <label for={day}>{day}</label>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              Time of Day:
              <TypeAhead
                value={timeOfDay}
                options={allTimeOfDays && allTimeOfDays.toJS()}
                onChange={(e) => this.handleChange(e, "time_of_day")}
              />
            </Col>
            <Col span={4}>
              Hours:
              <TypeAhead
                value={hours}
                options={allHours && allHours.toJS()}
                onChange={(e) => this.handleChange(e, "hours")}
              />
            </Col>
            <Col span={4}>
              Duration:
              <TypeAhead
                value={duration}
                options={allDurations && allDurations.toJS()}
                onChange={(e) => this.handleChange(e, "duration")}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              Ages:
              <TypeAhead
                value={ages}
                options={allAges && allAges.toJS()}
                onChange={(e) => this.handleChange(e, "ages")}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  render() {
    const {
      newCause: {
        name,
        organization,
        locations,
        image_link: imageLink,
        logo_link: logoLink,
        sections
      }
    } = this.state;
    const { organizations, updating } = this.props;

    return(
      <Page>
        <div className="create">
          <Row>
            <Col span={6}>
              Name: *
              <Input
                value={name}
                onChange={(e) => this.handleChange(e, "name")}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              Organization: *
              <TypeAhead
                value={organization}
                options={organizations && organizations.toJS()}
                onChange={(e) => this.handleChange(e, "organization")}
              />
            </Col>
          </Row>
          {this.renderLocations()}

          <Row>
            <Col span={12}>
              Logo Link: *
              <Input
                value={logoLink}
                onChange={(e) => this.handleChange(e, "logo_link")}
                disabled
              />
            </Col>
          </Row>
          {this.renderImages("logo_link")}

          {this.renderOverviewInfo()}

          <Row>
            <Col span={12}>
              Image Link:
              <Input
                value={imageLink}
                onChange={(e) => this.handleChange(e, "image_link")}
                disabled
              />
            </Col>
          </Row>
          {this.renderImages("image_link")}

          {this.renderSections()}
          {this.renderContactInfo()}

          <Row>
            <Col span={6}>
              <Button
                className="create__submit-btn"
                onClick={updating ? this.handleUpdateCause : this.handleAddCause}
                disabled={!name || !organization || (!locations || !locations.length) || !logoLink || !sections || !sections.length}
              >
                {updating ? "Update" : "Create"}
              </Button>
            </Col>
          </Row>
        </div>
      </Page>
    );
  }
}

CreateCause.constants = {
  en: {
    labels: {
      findCauses: 'FIND CAUSES',
      addCause: 'ADD CAUSE',
      submit: 'SUBMIT',
      apply: 'APPLY',
      cancel: 'CANCEL',
      review: 'REVIEW',
      moreInfo: 'MORE INFO',
      approve: 'APPROVE',
      reject: 'REJECT',
      pendingReview: 'Pending Review',
      rejected: 'Rejected',
    }
  }
};

export default connect(
  (state, props) => {
    const {
      match: { params },
    } = props;
    const { causeId } = params;
    const currentCauseId =  causeId || "NEW_CAUSE";
    return ({
      causeId: currentCauseId,
      updating: currentCauseId !== "NEW_CAUSE",
      userInfo: state.get('user'),
      email: state.getIn(['user', 'email']),
      isAdmin: state.getIn(['user', 'isAdmin']),
      causes: state.getIn(['causes', 'ALL']),
      organizations: state.getIn(['causes', 'info', 'organizations']),
      locations: state.getIn(['causes', 'info', 'locations']),
      cities: state.getIn(['causes', 'info', 'cities']),

      sectors: state.getIn(['causes', 'info', 'sectors']),
      days: state.getIn(['causes', 'info', 'weekDays']),

      timeOfDays: state.getIn(['causes', 'info', 'timeOfDays']),
      hours: state.getIn(['causes', 'info', 'hours']),
      durations: state.getIn(['causes', 'info', 'durations']),
      ages: state.getIn(['causes', 'info', 'ages']),

      provinces: state.getIn(['causes', 'info', 'provinces']),
      countries: state.getIn(['causes', 'info', 'countries'])
    });
  },
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(CreateCause));
