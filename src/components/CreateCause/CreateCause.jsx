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

class CreateCause extends Component {
  constructor(props) {
    super(props);
    this.defaultCauseState = {
      name: "",
      organization: "Hokela Technologies",
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
    }
    this.setState({ newCause: nextNewCause }, () => {
      if (fieldName === 'organization') {
        console.clear();
        console.log('GETTING IMAGES');
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
      newCause: this.defaultCauseState,
      images: [],
      logos: []
    }, this.getImages());
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
    console.clear();
    console.log('yooo;', files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log('file:', file);
      await causeActions.uploadFile(file, organization, type);
    }
    this.getImages();
  }

  renderImages = () => {
    const { images } = this.state;

    return (
      <>
        <Row>
          <Col span={12}>
            <div className="create__image-container">
              {images && images.map(image => {
                const URL = `https://storage.googleapis.com/hokela-images/${image}`;
                return (
                  <div
                    className="create__image"
                    onClick={() => this.handleChange({ target: { value: URL } }, "image_link")}
                    style={{ backgroundImage: `url('${URL}')` }}
                  />
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
              onChange={(e) => this.handleFiles(e.target.files, "images")}
            />
          </Col>
        </Row>
      </>
    );
  }

  renderLogos = () => {
    const { logos } = this.state;

    return (
      <>
        <Row>
          <Col span={12}>
            <div className="create__image-container">
              {logos && logos.map(image => {
                const URL = `https://storage.googleapis.com/hokela-images/${image}`;
                return (
                  <div
                    className="create__image"
                    onClick={() => this.handleChange({ target: { value: URL } }, "logo_link")}
                    style={{ backgroundImage: `url('${URL}')` }}
                  />
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
              onChange={(e) => this.handleFiles(e.target.files, "logos")}
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

    return(
      <Page>
        <div className="create">
          <Row>
            <Col span={6}>
              Name:
              <Input
                value={name}
                onChange={(e) => this.handleChange(e, "name")}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              Organization:
              <Input
                value={organization}
                onChange={(e) => this.handleChange(e, "organization")}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              Location:
              <Input
                value={location}
                onChange={(e) => this.handleChange(e, "location")}
              />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              Logo Link:
              <Input
                value={logoLink}
                onChange={(e) => this.handleChange(e, "logo_link")}
                disabled
              />
            </Col>
          </Row>
          {this.renderLogos()}

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
          {this.renderImages()}

          <Row>
            <Col span={6}>
              <Button
                onClick={this.handleAddCause}
                disabled={!name || !organization || !location}
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
    causes: state.getIn(['causes', 'ALL'])
  }),
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(CreateCause));
