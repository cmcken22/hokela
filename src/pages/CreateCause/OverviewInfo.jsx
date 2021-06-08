import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import { Row, Col } from '../../components/Grid';
import * as causeActions from '../../actions/causeActions';
import TypeAhead from '../../components/TypeAhead';

class OverviewInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSelectAllDays = (e) => {
    const {
      days: allDays,
      handleChange
    } = this.props;
    const { target: { checked } } = e;

    let nextDays = [];
    if (checked) {
      nextDays = !!allDays ? allDays.toJS() : [];
    }

    handleChange({ target: { value: nextDays } }, "days");
  }

  handleSelectDay = (e, day) => {
    const { newCause, handleChange } = this.props;
    const { days } = newCause;
    const { target: { checked } } = e;

    let nextDays = [];
    if (!!days && Array.isArray(days)) {
      nextDays = [...days];
    }

    if (checked) {
      nextDays.push(day);
    } else {
      const index = nextDays.indexOf(day);
      nextDays.splice(index, 1);
    }

    const sorter = {
      "sunday": 0,
      "monday": 1,
      "tuesday": 2,
      "wednesday": 3,
      "thursday": 4,
      "friday": 5,
      "saturday": 6
    }
    
    const sortedDays = nextDays.sort((a, b) => {
      let day1 = a.toLowerCase();
      let day2 = b.toLowerCase();
      return sorter[day1] - sorter[day2];
    });

    handleChange({ target: { value: sortedDays } }, "days");
  }

  handleSelectAllTimes = (e) => {
    const {
      timeOfDays: allTimeOfDays,
      handleChange
    } = this.props;
    const { target: { checked } } = e;

    let nextTimes = [];
    if (checked) {
      nextTimes = !!allTimeOfDays ? allTimeOfDays.toJS() : [];
    }

    handleChange({ target: { value: nextTimes } }, "time_of_day");
  }

  handleSelectTime = (e, time) => {
    const { newCause, handleChange } = this.props;
    const { time_of_day: timeOfDay } = newCause;
    const { target: { checked } } = e;

    let nextTimes = [];
    if (!!timeOfDay && Array.isArray(timeOfDay)) {
      nextTimes = [...timeOfDay];
    }

    if (checked) {
      nextTimes.push(time);
    } else {
      const index = nextTimes.indexOf(time);
      nextTimes.splice(index, 1);
    }

    console.clear();
    console.log('nextTimes:', nextTimes);

    const sorter = {
      "morning": 0,
      "afternoon": 1,
      "evening": 2,
      "all day": 3
    };
    
    const sortedTimes = nextTimes.sort((a, b) => {
      let time1 = a.toLowerCase();
      let time2 = b.toLowerCase();
      return sorter[time1] - sorter[time2];
    });

    handleChange({ target: { value: sortedTimes } }, "time_of_day");
  }

  render() {
    const {
      newCause: {
        sector,
        time_of_day: timeOfDay,
        days,
        hours,
        duration,
        ages
      },
      sectors: allSectors,
      timeOfDays: allTimeOfDays,
      days: allDays,
      hours: allHours,
      durations: allDurations,
      ages: allAges,
      handleChange  
    } = this.props;

    console.clear();
    console.log('timeOfDay:', timeOfDay);
    console.log('allTimeOfDays:', allTimeOfDays);
    console.log('timeOfDay && timeOfDay.length:', timeOfDay && timeOfDay.length);
    console.log('allTimeOfDays && allTimeOfDays.length:', allTimeOfDays && allTimeOfDays.size);

    return (
      <div className="create__locations">
        <div className="create__location-row">
          <h4>Overview Info</h4>
          <Row>
            <Col span={6}>
              Sector:
              <TypeAhead
                value={sector}
                options={allSectors && allSectors.toJS()}
                onChange={(e) => handleChange(e, "sector")}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              Days:
              <div className="create__check-boxes">
                <div className="create__check-box-option">
                  <input
                    type="checkbox"
                    id="All"
                    name="All"
                    value="All"
                    onChange={(e) => this.handleSelectAllDays(e)}
                    checked={days && days.length === 7}
                  />
                  <label for="All">Select All</label>
                </div>
                {allDays && allDays.map(day => {
                  return (
                    <div className="create__check-box-option">
                      <input
                        type="checkbox"
                        id={day}
                        name={day}
                        value={day}
                        onChange={(e) => this.handleSelectDay(e, day)}
                        checked={days && days.indexOf(day) !== -1}
                      />
                      <label for={day}>{day}</label>
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col span={4}>
              Time of Day:
              <div className="create__check-boxes">
                <div className="create__check-box-option">
                  <input
                    type="checkbox"
                    id="All"
                    name="All"
                    value="All"
                    onChange={(e) => this.handleSelectAllTimes(e)}
                    checked={(timeOfDay && timeOfDay.length) === (allTimeOfDays && allTimeOfDays.size)}
                  />
                  <label for="All">Select All</label>
                </div>
                {allTimeOfDays && allTimeOfDays.map(time => {
                  return (
                    <div className="create__check-box-option">
                      <input
                        type="checkbox"
                        id={time}
                        name={time}
                        value={time}
                        onChange={(e) => this.handleSelectTime(e, time)}
                        checked={timeOfDay && timeOfDay.indexOf(time) !== -1}
                      />
                      <label for={time}>{time}</label>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              Hours:
              <TypeAhead
                value={hours}
                options={allHours && allHours.toJS()}
                onChange={(e) => handleChange(e, "hours")}
              />
            </Col>
            <Col span={4}>
              Duration:
              <TypeAhead
                value={duration}
                options={allDurations && allDurations.toJS()}
                onChange={(e) => handleChange(e, "duration")}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              Ages:
              <TypeAhead
                value={ages}
                options={allAges && allAges.toJS()}
                onChange={(e) => handleChange(e, "ages")}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

OverviewInfo.constants = {
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
      sectors: typeAheadInfo.get('sectors'),
      days: typeAheadInfo.get('weekDays'),
      timeOfDays: typeAheadInfo.get('timeOfDays'),
      hours: typeAheadInfo.get('hours'),
      durations: typeAheadInfo.get('durations'),
      ages: typeAheadInfo.get('ages')
    });
  },
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(OverviewInfo));
