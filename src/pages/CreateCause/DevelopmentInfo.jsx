import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import { Row, Col } from '../../components/Grid';
import * as causeActions from '../../actions/causeActions';
import TypeAhead from '../../components/TypeAhead';

class DevelopmentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSelectAll = (e, type, options) => {
    const {
      [options]: allOptions,
      handleChange
    } = this.props;
    const { target: { checked } } = e;

    let nextValues = [];
    if (checked) {
      nextValues = !!allOptions ? allOptions.toJS() : [];
    }

    handleChange({ target: { value: nextValues } }, type);
  }

  handleSelect = (e, val, type) => {
    const { newCause, handleChange } = this.props;
    const { [type]: temp } = newCause;
    const { target: { checked } } = e;

    let nextValues = [];
    if (!!temp && Array.isArray(temp)) {
      nextValues = [...temp];
    }

    if (checked) {
      nextValues.push(val);
    } else {
      const index = nextValues.indexOf(val);
      nextValues.splice(index, 1);
    }

    handleChange({ target: { value: nextValues } }, type);
  }

  render() {
    const {
      newCause: {
        area,
        other_skills: otherSkills,
        ideal_for: idealFor
      },
      areas: allAreas,
      otherSkills: allOtherSkills,
      idealFor: allIdealFor,
      handleChange
    } = this.props;

    return(
      <div className="create__locations">
        <div className="create__location-row">
          <h4>Development Info</h4>
          <Row>
            <Col span={6}>
              Area:
              <TypeAhead
                value={area}
                options={allAreas && allAreas.toJS()}
                onChange={(e) => handleChange(e, "area")}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              Other Skills:
              <div className="create__check-boxes">
                <div className="create__check-box-option">
                  <input
                    type="checkbox"
                    id="All"
                    name="All"
                    value="All"
                    onChange={(e) => this.handleSelectAll(e, "other_skills", "otherSkills")}
                    checked={(otherSkills && otherSkills.length) === (allOtherSkills && allOtherSkills.size)}
                  />
                  <label for="All">Select All</label>
                </div>
                {allOtherSkills && allOtherSkills.map(skill => {
                  return (
                    <div className="create__check-box-option">
                      <input
                        type="checkbox"
                        id={skill}
                        name={skill}
                        value={skill}
                        onChange={(e) => this.handleSelect(e, skill, "other_skills")}
                        checked={otherSkills && otherSkills.indexOf(skill) !== -1}
                      />
                      <label for={skill}>{skill}</label>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              Suitable For:
              <div className="create__check-boxes">
                <div className="create__check-box-option">
                  <input
                    type="checkbox"
                    id="All"
                    name="All"
                    value="All"
                    onChange={(e) => this.handleSelectAll(e, "ideal_for", "idealFor")}
                    checked={(idealFor && idealFor.length) === (allIdealFor && allIdealFor.size)}
                  />
                  <label for="All">Select All</label>
                </div>
                {allIdealFor && allIdealFor.map(ideal => {
                  return (
                    <div className="create__check-box-option">
                      <input
                        type="checkbox"
                        id={ideal}
                        name={ideal}
                        value={ideal}
                        onChange={(e) => this.handleSelect(e, ideal, "ideal_for")}
                        checked={idealFor && idealFor.indexOf(ideal) !== -1}
                      />
                      <label for={ideal}>{ideal}</label>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

DevelopmentInfo.constants = {
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
    const typeAheadInfo = state.getIn(['causes', 'info']);
    return ({
      areas: typeAheadInfo.get('areas'),
      otherSkills: typeAheadInfo.get('otherSkills'),
      idealFor: typeAheadInfo.get('idealFor'),
    });
  },
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(DevelopmentInfo));
