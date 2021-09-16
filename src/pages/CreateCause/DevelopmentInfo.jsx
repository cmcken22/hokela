import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import { Row, Col } from '../../components/Grid';
import * as causeActions from '../../actions/causeActions';
import TypeAhead from '../../components/TypeAhead';
import MultiSelect from 'Components/MultiSelect';

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
  
  handleMultiSelect = (selectedOptions, type) => {
    const { handleChange } = this.props;
    handleChange({ target: { value: selectedOptions } }, type);
  }

  render() {
    const {
      newCause: {
        area,
        other_skills: otherSkills,
        ideal_for: idealFor
      },
      skills: allAreas,
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
              {/* previously area.. in DB it is still area */}
              Skill:
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
              <MultiSelect
                options={allOtherSkills && allOtherSkills.toJS()}
                selected={otherSkills && otherSkills}
                onChange={(value) => this.handleMultiSelect(value, "other_skills")}
                allowCustomOptions
                selectAll
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              Suitable For:
              <div className="create__check-boxes">
                <div className="create__check-box-option">
                  <input
                    key={`All-suitable--${idealFor && idealFor.length}`}
                    type="checkbox"
                    id="All-suitable"
                    name="All-suitable"
                    value="All"
                    onChange={(e) => this.handleSelectAll(e, "ideal_for", "idealFor")}
                    checked={(idealFor && idealFor.length) === (allIdealFor && allIdealFor.size)}
                  />
                  <label for="All-suitable">Select All</label>
                </div>
                {allIdealFor && allIdealFor.map(ideal => {
                  return (
                    <div className="create__check-box-option">
                      <input
                        key={`${ideal}--${idealFor && idealFor.length}`}
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
      skills: typeAheadInfo.get('skills'),
      otherSkills: typeAheadInfo.get('otherSkills'),
      idealFor: typeAheadInfo.get('idealFor'),
    });
  },
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(DevelopmentInfo));
