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
      organization: "Hokela Technologie",
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
        axios.get(`${process.env.API_URL}/cause-api/v1/causes/images?org=${value}`, getBaseHeader())
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

        axios.get(`${process.env.API_URL}/cause-api/v1/causes/logos?org=${value}`, getBaseHeader())
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
    this.setState({ newCause: this.defaultCauseState });
  }

  renderImages = () => {
    const { images } = this.state;
    console.clear();
    console.log('images:', images);
    if (!images || !images.length) return null;

    return (
      <Row>
        {images.map(image => {
          console.log('urL:', `url(${image})`);
          const URL = `https://storage.googleapis.com/hokela-images/${image}`;
          return (
            <div
              onClick={() => this.handleChange({ target: { value: URL } }, "image_link")}
              style={{
                height: "100px",
                width: "100px",
                backgroundColor: "red",
                marginRight: "2px",
                backgroundImage: `url('${URL}')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
            />
          )
        })}
      </Row>
    )
  }

  renderLogos = () => {
    const { logos } = this.state;
    console.clear();
    console.log('logos:', logos);
    if (!logos || !logos.length) return null;

    return (
      <Row>
        {logos.map(image => {
          console.log('urL:', `url(${image})`);
          const URL = `https://storage.googleapis.com/hokela-images/${image}`;
          return (
            <div
              onClick={() => this.handleChange({ target: { value: URL } }, "logo_link")}
              style={{
                height: "100px",
                width: "100px",
                backgroundColor: "red",
                marginRight: "2px",
                backgroundImage: `url('${URL}')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
            />
          )
        })}
      </Row>
    )
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
            <Col span={6}>
              <Button onClick={this.handleAddCause}>
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
