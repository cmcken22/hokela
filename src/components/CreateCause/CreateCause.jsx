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
      location: "",
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
    this.getImages();
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
    this.setState({
      newCause: { ...this.defaultCauseState },
      images: [],
      logos: []
    }, () => this.getImages());
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

  // getTypeAheadOptions = async () => {
  //   const { causeActions } = this.props;
  //   const { organizations, locations } = await causeActions.getTypeAheadOptions();
  //   this.setState({ organizations, locations });
  // }

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
        [type]: linkType
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
              // ref={r => this.fileUploadRef = r}
              // id={`file-upload__fileElem--${id}`}
              className="file-upload__fileElem"
              multiple
              accept="image/png, image/jpeg"
              onChange={(e) => this.handleFiles(e.target.files, type)}
            />
          </Col>
        </Row>
      </>
    );
  }

  render() {
    const {
      newCause: {
        name,
        organization,
        location,
        image_link: imageLink,
        logo_link: logoLink
      }
    } = this.state;
    const { organizations, locations } = this.props;

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
          <Row>
            <Col span={6}>
              Location: *
              <TypeAhead
                value={location}
                options={locations && locations.toJS()}
                onChange={(e) => this.handleChange(e, "location")}
              />
            </Col>
          </Row>

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
                disabled={!name || !organization || !location || !logo_link}
              >
                Create
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
  state => ({
    userInfo: state.get('user'),
    email: state.getIn(['user', 'email']),
    isAdmin: state.getIn(['user', 'isAdmin']),
    causes: state.getIn(['causes', 'ALL']),
    organizations: state.getIn(['causes', 'info', 'organizations']),
    locations: state.getIn(['causes', 'info', 'locations']),
  }),
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(CreateCause));
