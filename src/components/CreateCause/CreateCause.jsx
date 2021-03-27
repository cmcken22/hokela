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

class CreateCause extends Component {
  constructor(props) {
    super(props);
    this.defaultCauseState = {
      name: "",
      organization: "",
      locations: "",
      image_link: "",
      logo_link: "",
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
    this.getImages();
  }

  loadCause = async () => {
    const { causeActions, causeId } = this.props;
    const cause = await causeActions.getCauseById(causeId);
    this.setState({ newCause: cause }, this.getImages);
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
      }
    });
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
      setTimeout(() => history.push(`/create-cause`));
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
                console.log('image:', image);
                return (
                  <div key={`image--${image}`} className="create__image-wrapper">
                    <div
                      className="create__image"
                      onClick={() => this.handleChange({ target: { value: URL } }, type)}
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

  render() {
    const {
      newCause: {
        name,
        organization,
        locations,
        image_link: imageLink,
        logo_link: logoLink
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

          <Row>
            <Col span={6}>
              <Button
                onClick={this.handleAddCause}
                onClick={updating ? this.handleUpdateCause : this.handleAddCause}
                disabled={!name || !organization || (!locations || !locations.length) || !logoLink}
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
      provinces: state.getIn(['causes', 'info', 'provinces']),
      countries: state.getIn(['causes', 'info', 'countries'])
    });
  },
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(CreateCause));
