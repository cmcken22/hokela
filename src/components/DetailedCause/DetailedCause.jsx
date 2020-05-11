import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Button, Row, Col } from "antd";

import * as causeActions from '../../actions/causeActions';

class DetailedCause extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderNoCause = () => {
    const {
      en: { labels } 
    } = DetailedCause.constants;
    return (
      <div className="detailed-cause">
        <h1>{labels.notFound}</h1>
      </div>
    );
  }

  acceptApplicant = (applicantId) => {
    const { causeActions, cause } = this.props;
    causeActions.acceptApplicant(cause.get('_id'), applicantId);
  }

  rejectApplicant = (applicantId) => {
    const { causeActions, cause } = this.props;
    causeActions.rejectApplicant(cause.get('_id'), applicantId);
  }

  renderAcceptButton = (applicant) => {
    const {
      en: { labels }
    } = DetailedCause.constants;
    return (
      <Button
        type="primary"
        className="action-btn"
        onClick={() => this.acceptApplicant(applicant.get('_id'))}
      >
        {labels.accept}
      </Button>
    );
  }

  renderRejectButton = (applicant) => {
    const {
      en: { labels }
    } = DetailedCause.constants;
    return (
      <Button
        className="action-btn"
        onClick={() => this.rejectApplicant(applicant.get('_id'))}
      >
        {labels.reject}
      </Button>
    );
  }

  renderActions = (applicant) => {
    const status = applicant.get('status');
    if (status === 'PENDING') {
      return (
        <div className="actions">
          {this.renderRejectButton(applicant)}
          {this.renderAcceptButton(applicant)}
        </div>
      );
    }
    if (status === 'ACCEPTED') {
      return (
        <div className="actions">
          {this.renderRejectButton(applicant)}
        </div>
      );
    }
    if (status === 'REJECTED') {
      return (
        <div className="actions">
          {this.renderAcceptButton(applicant)}
        </div>
      );
    }
  }

  renderApplicants = () => {
    const {
      en: { labels } 
    } = DetailedCause.constants;
    const { applicants } = this.props;
    return (
      <div className="detailed-cause__panel detailed-cause__applicants">
        <h1>{labels.applicants}</h1>
        <div className="detailed-cause__applicants-list">
          {applicants && applicants.valueSeq().map(applicant => {
            return (
              <div key={`applicant--${applicant.get('_id')}`} className="applicant">
                <Row gutter={16}>
                  <Col span={8}>
                    <p className="name">{applicant.get('name')}</p>
                  </Col>
                  <Col span={8}>
                    <p className="status">{applicant.get('status')}</p>
                  </Col>
                  <Col span={8}>
                    {this.renderActions(applicant)}
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const {
      en: { labels } 
    } = DetailedCause.constants;
    const { cause, email, isAdmin } = this.props;
    if (!cause) return this.renderNoCause();

    return(
      <div className="detailed-cause">
        <Row>
          <Col offset={5} span={14}>
            <div className="detailed-cause__header">
              <h1>{cause.get('name')}</h1>
            </div>
            <div className="detailed-cause__content">
              <Row gutter={16}>
                <Col span={16}>
                  <div className="detailed-cause__panel detailed-cause__description">
                    <p>{cause.get('description')}</p>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="detailed-cause__panel detailed-cause__overview">
                    <h1>{labels.overview}</h1>
                  </div>
                </Col>
              </Row>
              {isAdmin || email === cause.getIn(['created_by', 'email']) ? (
                <Row gutter={16}>
                  <Col span={24}>
                    {this.renderApplicants()}
                  </Col>
                </Row>
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

DetailedCause.constants = {
  en: {
    labels: {
      notFound: '404: Cause not found!',
      overview: 'Overview',
      applicants: 'Applicants',
      accept: 'ACCEPT',
      reject: 'REJECT'
    }
  }
};

export default connect(
  (state, props) => {
    const {
      match: { params },
    } = props;
    const { causeId } = params;
    return ({
      userInfo: state.get('user'),
      email: state.getIn(['user', 'email']),
      isAdmin: state.getIn(['user', 'isAdmin']),
      causes: state.get('causes'),
      cause: state.getIn(['causes', causeId]),
      applicants: state.getIn(['causes', causeId, 'applicants'])
    })
  },
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(DetailedCause));
