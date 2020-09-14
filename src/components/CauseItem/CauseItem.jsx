import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Button, Input, Row, Col } from "antd";

import * as causeActions from '../../actions/causeActions';
import * as CONSTANTS from '../../constants';

class CauseItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      addCause: false
    };
  }

  disaplyForm = () => {
    const { addCause } = this.state;
    const nextState = !addCause;
    this.setState({ addCause: nextState }, () => {
      if (!nextState) this.resetForm();
    });
  }

  handleChange = (e, fieldName) => {
    const { target: { value } } = e;
    this.setState({ [fieldName]: value });
  }

  checkDisabled = () => {
    const { name, description, addCause } = this.state;
    if (!addCause) return false;
    if (!name || !description) return true;
    return false;
  }

  handleAddCause = () => {
    const { causeActions } = this.props;
    const { name, description } = this.state;
    causeActions.addCause(name, description).then(newCause => {
      if (newCause) this.resetForm();
    });
  }

  handleDelete = (id) => {
    const { causeActions } = this.props;
    causeActions.deleteCause(id);
  }

  resetForm = () => {
    this.setState({
      name: null,
      description: null,
      addCause: false
    });
  }

  handleOpenCause = (id) => {
    const { history } = this.props;
    history.push(`/causes/${id}`);
  }

  handleApplyToCause = (id) => {
    const { causeActions } = this.props;
    causeActions.applyToCause(id);
  }

  handleApproveCause = (id) => {
    const { causeActions } = this.props;
    causeActions.approveCause(id);
  }

  handleRejectCause = (id) => {
    const { causeActions } = this.props;
    causeActions.rejectCause(id);
  }

  renderApplyButton = (cause) => {
    const {
      en: { labels } 
    } = CauseItem.constants;
    const { causes, email } = this.props;
    if (!email || !causes || !cause) return null;
    let hasAlreadyApplied = false;

    const applicants = cause.get('applicants');
    if (applicants) {
      hasAlreadyApplied = applicants.valueSeq().some(applicant => applicant.get('email') === email);
    }

    if (hasAlreadyApplied) return null;
    return (
      <Button
        // type="primary"
        className="causes__apply-btn"
        onClick={() => this.handleApplyToCause(cause.get('_id'))}
      >
        {labels.apply}
      </Button>
    );
  }

  renderViewButton = (cause) => {
    const {
      en: { labels } 
    } = CauseItem.constants;
    return (
      <Button
        type="primary"
        className="causes__more-info-btn"
        onClick={() => this.handleOpenCause(cause.get('_id'))}
      >
        {labels.moreInfo}
      </Button>
    );
  }

  renderReviewButton = (cause) => {
    const {
      en: { labels } 
    } = CauseItem.constants;
    return (
      <Button
        type="primary"
        className="causes__more-info-btn"
        onClick={() => this.handleOpenCause(cause.get('_id'))}
      >
        {labels.review}
      </Button>
    );
  }

  renderActions = (cause) => {
    const { ACTIVE, IN_REVIEW, REJECTED } = CONSTANTS;
    const { isAdmin, email } = this.props;
    const status = cause.get('status');
    const createdBy = cause.getIn(['created_by', 'email']);

    if (status === ACTIVE) {
      return (
        <div className="causes__actions">
          {this.renderApplyButton(cause)}
          {this.renderViewButton(cause)}
        </div>
      );
    }
    if (isAdmin && status === IN_REVIEW) {
      return (
        <div className="causes__actions">
          {this.renderReviewButton(cause)}
        </div>
      );
    }
    if (email === createdBy && status === REJECTED) {
      return (
        <div className="causes__actions">
          {this.renderViewButton(cause)}
        </div>
      );
    }
    if (!isAdmin && email === createdBy && status === IN_REVIEW) {
      return (
        <div className="causes__actions">
          {this.renderViewButton(cause)}
        </div>
      );
    }
  }

  validateCause = (cause) => {
    const { IN_REVIEW, REJECTED } = CONSTANTS;
    const { isAdmin, email } = this.props;
    const status = cause.get('status');
    const createdBy = cause.getIn(['created_by', 'email']);
    if (isAdmin) return true;
    if (status === REJECTED) return false;
    if (status !== IN_REVIEW) return true;
    if (email === createdBy) return true;
    return false;
  }

  renderTitle = (cause) => {
    const {
      en: { labels }
    } = CauseItem.constants;
    const { IN_REVIEW, REJECTED } = CONSTANTS;
    const status = cause.get('status');
    return (
      <>
        <p className="cause-item__title--main">
          {cause.get('name')}&nbsp;
          <i className="cause-item__title--pending">{status === IN_REVIEW ? `(${labels.pendingReview})` : ''}</i>
          <i className="cause-item__title--rejected">{status === REJECTED ? `(${labels.rejected})` : ''}</i>
        </p>
        <p className="cause-item__title--location">Toronto, ON</p>
      </>
    );
  }

  render() {
    const {
      en: { labels }
    } = CauseItem.constants;
    const { IN_REVIEW, REJECTED } = CONSTANTS;
    const { isAdmin, email, cause } = this.props;

    const owner = cause.getIn(['created_by', 'email']);
    const status = cause.get('status');
    if (!this.validateCause(cause)) return null;

    return (
      <div className="cause-item">
        <div className="cause-item__avatar-container">
          <div className="cause-item__avatar">

          </div>
        </div>
        <div className="cause-item__content">
          <div className="cause-item__title">
            {this.renderTitle(cause)}
            {isAdmin || owner === email ? (
              <div className="causes__delete-btn" onClick={() => this.handleDelete(cause.get('_id'))}>&times;</div>
            ) : null}
          </div>
          <div className="cause-item__description">
            <p>{cause.get('description')}</p>
          </div>
          {this.renderActions(cause)}
        </div>
      </div>
    );
  }
}

CauseItem.constants = {
  en: {
    labels: {
      addCause: 'ADD CAUSE',
      submit: 'SUBMIT',
      apply: 'Apply',
      cancel: 'CANCEL',
      review: 'REVIEW',
      moreInfo: 'More Info',
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
    causes: state.get('causes')
  }),
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(CauseItem));
