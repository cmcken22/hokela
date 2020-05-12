import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Button, Row, Col } from "antd";

import * as causeActions from '../../actions/causeActions';
import * as bannerActions from '../../actions/bannerActions';
import * as CONSTANTS from '../../constants';
import { confirmLoggedIn } from '../../utils';
import withConfirmedLoggedIn from '../../HOC/WithConfirmLoggedIn';

class MyCauses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidUpdate() {
  //   const { history } = this.props;
  //   if (!confirmLoggedIn()) {
  //     history.push('/');
  //   }
  // }

  handleOpenCause = (id) => {
    const { history } = this.props;
    history.push(`/causes/${id}`);
  }

  renderViewButton = (cause) => {
    const {
      en: { labels } 
    } = MyCauses.constants;
    return (
      <Button
        className="causes__more-info-btn"
        onClick={() => this.handleOpenCause(cause.get('_id'))}
      >
        {labels.moreInfo}
      </Button>
    );
  }

  renderActions = (cause) => {
    const { ACTIVE, IN_REVIEW, REJECTED } = CONSTANTS;
    const { isAdmin, email } = this.props;
    const status = cause.get('status');
    const createdBy = cause.getIn(['created_by', 'email']);

    return (
      <div className="causes__actions">
        {this.renderViewButton(cause)}
      </div>
    );
  }

  validateCause = (cause) => {
    const { email } = this.props;
    const createdBy = cause.getIn(['created_by', 'email']);
    if (createdBy === email) return true;
    return false;
  }

  render() {
    const {
      en: { labels } 
    } = MyCauses.constants;
    const { IN_REVIEW, REJECTED } = CONSTANTS;
    const { causes, isAdmin, email } = this.props;

    return(
      <div className="my-causes">
        <Row>
          <Col offset={5} span={14}>
            <div className="my-causes__list">
              {causes && causes.entrySeq().map(([id, cause]) => {
                const owner = cause.getIn(['created_by', 'email']);
                const status = cause.get('status');
                if (!this.validateCause(cause)) return null;
                return (
                  <div key={`cause--${id}`} className="causes__item">
                    <div className="causes__item-title">
                      <p>{cause.get('name')}</p>
                      <i className="causes__item-title--pending">{status === IN_REVIEW ? `(${labels.pendingReview})` : ''}</i>
                      <i className="causes__item-title--rejected">{status === REJECTED ? `(${labels.rejected})` : ''}</i>
                      {isAdmin || owner === email ? (
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
          </Col>
        </Row>
      </div>
    );
  }
}

MyCauses.constants = {
  en: {
    labels: {
      addCause: 'ADD CAUSE',
      submit: 'SUBMIT',
      apply: 'APPLY',
      cancel: 'CANCEL',
      review: 'REVIEW',
      moreInfo: 'MORE INFO',
      approve: 'APPROVE',
      reject: 'REJECT',
      pendingReview: 'Pening Review',
      rejected: 'Rejected',
    }
  }
};

const MyCausesWithRouter = withRouter(MyCauses);

export default withConfirmedLoggedIn(connect(
  state => ({
    userInfo: state.get('user'),
    email: state.getIn(['user', 'email']),
    isAdmin: state.getIn(['user', 'isAdmin']),
    causes: state.get('causes')
  }),
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch),
    bannerActions: bindActionCreators(bannerActions, dispatch)
  })
)(MyCausesWithRouter));
