import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Button, Input } from "antd";

import * as causeActions from '../../actions/causeActions';

class Causes extends Component {
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
    } = Causes.constants;
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
        type="primary"
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
    } = Causes.constants;
    return (
      <Button
        // type="primary"
        className="causes__more-info-btn"
        onClick={() => this.handleOpenCause(cause.get('_id'))}
      >
        {labels.moreInfo}
      </Button>
    );
  }

  renderApproveButton = (cause) => {
    const {
      en: { labels } 
    } = Causes.constants;
    return (
      <Button
        type="primary"
        className="causes__more-info-btn"
        onClick={() => this.handleApproveCause(cause.get('_id'))}
      >
        {labels.approve}
      </Button>
    );
  }

  renderRejectButton = (cause) => {
    const {
      en: { labels } 
    } = Causes.constants;
    return (
      <Button
        // type="primary"
        className="causes__more-info-btn"
        onClick={() => this.handleApproveCause(cause.get('_id'))}
      >
        {labels.reject}
      </Button>
    );
  }

  renderActions = (cause) => {
    const { isAdmin, email } = this.props;
    const status = cause.get('status');
    if (status === 'ACTIVE') {
      return (
        <div className="causes__actions">
          {this.renderViewButton(cause)}
          {this.renderApplyButton(cause)}
        </div>
      );
    }
    if (isAdmin && status === 'IN_REVIEW') {
      return (
        <div className="causes__actions">
          {this.renderRejectButton(cause)}
          {this.renderApproveButton(cause)}
        </div>
      );
    }
  }

  render() {
    const {
      en: { labels } 
    } = Causes.constants;
    const { name, description, addCause } = this.state;
    const { isAdmin, email, causes } = this.props;

    return(
      <div className="causes"> 
        <div className="causes__list">
          {causes && causes.entrySeq().map(([id, cause]) => {
            const owner = cause.getIn(['created_by', 'email']);
            const status = cause.get('status');
            if (!isAdmin && status === 'IN_REVIEW') return null;
            return (
              <div key={`cause--${id}`} className="causes__item">
                <div className="causes__item-title">
                  <p>{cause.get('name')} - {cause.get('status')}</p>
                  {owner === email ? (
                    <div className="causes__delete-btn" onClick={() => this.handleDelete(id)}>&times;</div>
                  ) : null}
                </div>
                <div className="causes__item-description">
                  <p>{cause.get('description')}</p>
                </div>
                {this.renderActions(cause)}
              </div>
            );
          })}
        </div>
        {isAdmin ? (
          <div className="causes__form-container">
            <div className={cx("causes__form", {
              "causes__form--active": addCause
            })}>
              <Input
                placeholder="Name..."
                value={name}
                onChange={(e) => this.handleChange(e, "name")}
              />
              <Input
                placeholder="Description..."
                value={description}
                onChange={(e) => this.handleChange(e, "description")}
              />
              <Button
                type="primary"
                className="causes__submit-btn"
                onClick={this.handleAddCause}
                disabled={this.checkDisabled()}
              >
                {labels.submit}
              </Button>
            </div>

            <div className="causes__add-cause-btn-container">
              <Button
                type="primary"
                onClick={this.disaplyForm}
              >
                {!addCause ? labels.addCause : labels.cancel}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Causes.constants = {
  en: {
    labels: {
      addCause: 'ADD CAUSE',
      submit: 'SUBMIT',
      apply: 'APPLY',
      cancel: 'CANCEL',
      moreInfo: 'MORE INFO',
      approve: 'APPROVE',
      reject: 'REJECT'
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
)(withRouter(Causes));
