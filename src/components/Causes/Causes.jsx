import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Button, Input, Row, Col } from "antd";
import shortid from 'shortid';

import * as causeActions from '../../actions/causeActions';
import * as CONSTANTS from '../../constants';
import CauseItem from '../CauseItem';
import Hero from '../Hero';
import AddCauseForm from '../AddCauseForm/AddCauseForm';

class Causes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      addCause: false,
      displayForm: false,
      formId: shortid.generate()
    };
  }

  disaplyForm = () => {
    const { displayForm } = this.state;
    this.setState({ displayForm: !displayForm, formId: shortid.generate() });
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

  render() {
    const {
      en: { labels }
    } = Causes.constants;
    const { IN_REVIEW, REJECTED } = CONSTANTS;
    const { name, description, addCause, displayForm, formId } = this.state;
    const { isAdmin, email, causes } = this.props;

    return(
      <div className="causes">
        <Hero type="find-causes" initialOffset={-46}>
          <div className="causes__hero-content">
            <h1>{labels.findCauses}</h1>
          </div>
        </Hero>

        <div className="causes__content">
          <Row gutter={16}>
            <Col offset={6} span={4}>
              <div style={{
                height: `1000px`,
                width: '100%',
                background: 'white',
                borderRadius: '5px',
              }}>

              </div>
            </Col>
            <Col span={8}>
              <div className="causes__list">
                {causes && causes.entrySeq().map(([id, cause]) => {
                  return (
                    <CauseItem
                      key={`cause--${cause.get('_id')}`}
                      cause={cause}
                    />
                  );
                })}
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col offset={6} span={12}>
              {email ? (
                <div className="causes__form-container">
                  <div className="causes__add-cause-btn-container">
                    <Button
                      type="primary"
                      onClick={this.disaplyForm}
                    >
                      {labels.addCause}
                    </Button>
                  </div>
                </div>
              ) : null}
            </Col>
          </Row>
        </div>

        <AddCauseForm
          key={formId}
          display={displayForm}
          onClose={this.disaplyForm}
        />
      </div>
    );
  }
}

Causes.constants = {
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
    causes: state.get('causes')
  }),
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(Causes));
