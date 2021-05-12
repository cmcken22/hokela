import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../Button';
import FilterItem from './FilterItem';
import { Row } from '../Grid';

import * as filterActions from '../../actions/filterActions';
import "./cause-filters.scss";

class CauseFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreFilters: false
    };
  }

  handleChange = (value, type) => {
    const { filterActions } = this.props;
    filterActions.setFilterValue(type, value);
    setTimeout(() => filterActions.performSearch());
  }

  toggleMoreFilters = () => {
    const { moreFilters } = this.state;
    this.setState({ moreFilters: !moreFilters });
  }

  renderLocationFilter = () => {
    const {
      addresses,
      selectedLocations,
    } = this.props;

    return (
      <div className="xfilters__col">
        <div className="xfilters__item">
          <FilterItem
            title="Location"
            placeholder="Where?"
            options={addresses && addresses.toJS()}
            selected={selectedLocations && selectedLocations.toJS()}
            onChange={(value) => this.handleChange(value, "locations")}
          />
        </div>
      </div>
    );
  }

  renderSectorFilter = () => {
    const {
      sectors,
      selectedSectors
    } = this.props;

    return (
      <div className="xfilters__col">
        <div className="xfilters__item">
          <FilterItem
            title="Sector"
            placeholder="Community, animals, etc."
            options={sectors && sectors.toJS()}
            selected={selectedSectors && selectedSectors.toJS()}
            onChange={(value) => this.handleChange(value, "sectors")}
          />
        </div>
      </div>
    );
  }

  renderTimeOfDayFilter = () => {
    const {
      timeOfDays,
      selectedTimeOfDays
    } = this.props;

    return (
      <div className="xfilters__col">
        <div className="xfilters__item">
          <FilterItem
            title="Time of day"
            placeholder="Select time(s) of day"
            options={timeOfDays && timeOfDays.toJS()}
            selected={selectedTimeOfDays && selectedTimeOfDays.toJS()}
            onChange={(value) => this.handleChange(value, "timeOfDays")}
          />
        </div>
      </div>
    );
  }

  renderCommitmentLevelFilter = () => {
    const {
      durations,
      selectedDurations
    } = this.props;

    return (
      <div className="xfilters__col">
        <div className="xfilters__item">
          <FilterItem
            title="Commitment level"
            placeholder="For how long?"
            options={durations && durations.toJS()}
            selected={selectedDurations && selectedDurations.toJS()}
            onChange={(value) => this.handleChange(value, "durations")}
          />
        </div>
      </div>
    );
  }

  renderSkillsFilter = () => {
    const {
      skills,
      selectedSkills
    } = this.props;

    return (
      <div className="xfilters__col">
        <div className="xfilters__item">
          <FilterItem
            title="Skills"
            placeholder="Teaching, research, etc."
            options={skills && skills.toJS()}
            selected={selectedSkills && selectedSkills.toJS()}
            onChange={(value) => this.handleChange(value, "skills")}
          />
        </div>
      </div>
    );
  }

  renderOrganizationFilter = () => {
    const {
      organizations,
      selectedOrganizations
    } = this.props;

    return (
      <div className="xfilters__col">
        <div className="xfilters__item">
          <FilterItem
            title="Organization"
            placeholder="Which organization?"
            options={organizations && organizations.toJS()}
            selected={selectedOrganizations && selectedOrganizations.toJS()}
            onChange={(value) => this.handleChange(value, "organizations")}
          />
        </div>
      </div>
    );
  }

  renderAgeFilter = () => {
    const {
      ages,
      selectedAges
    } = this.props;

    return (
      <div className="xfilters__col">
        <div className="xfilters__item">
          <FilterItem
            title="Age"
            placeholder="All ages or specific ranges?"
            options={ages && ages.toJS()}
            selected={selectedAges && selectedAges.toJS()}
            onChange={(value) => this.handleChange(value, "ages")}
          />
        </div>
      </div>
    );
  }

  renderDayOfWeekFilter = () => {
    const {
      weekDays,
      selectedWeekDays
    } = this.props;

    return (
      <div className="xfilters__col">
        <div className="xfilters__item">
          <FilterItem
            title="Day of week"
            placeholder="What days are you free?"
            options={weekDays && weekDays.toJS()}
            selected={selectedWeekDays && selectedWeekDays.toJS()}
            onChange={(value) => this.handleChange(value, "weekDays")}
          />
        </div>
      </div>
    );
  }

  renderIdealForFilter = () => {
    const {
      idealFor,
      selectedIdealFor
    } = this.props;

    return (
      <div className="xfilters__col">
        <div className="xfilters__item">
          <FilterItem
            title="Ideal for"
            placeholder="Groups, retirees, etc."
            options={idealFor && idealFor.toJS()}
            selected={selectedIdealFor && selectedIdealFor.toJS()}
            onChange={(value) => this.handleChange(value, "idealFor")}
          />
        </div>
      </div>
    );
  }

  render() {
    const {
      addresses,
      selectedLocations,
      organizations,
      selectedOrganizations
    } = this.props;
    const { moreFilters } = this.state;

    return (
      <Row className="xfilters">

        {this.renderLocationFilter()}
        {this.renderSectorFilter()}
        {this.renderTimeOfDayFilter()}
        {this.renderCommitmentLevelFilter()}

        {moreFilters && (
          <>
            {this.renderSkillsFilter()}
            {this.renderOrganizationFilter()}
            {this.renderAgeFilter()}
            {this.renderDayOfWeekFilter()}
            {this.renderIdealForFilter()}
          </>
        )}


        <div className="xfilters__col">
          <div className="xfilters__item">
            <Button
              caseSensitive
              secondary
              onClick={this.toggleMoreFilters}
            >
              {moreFilters ? "Less filters" : "More filters"}
            </Button>
          </div>
        </div>
      </Row>
    );
  }
}

export default connect(
  state => ({
    addresses: state.getIn(['causes', 'info', 'addresses']),
    selectedLocations: state.getIn(['filter', 'locations']),

    sectors: state.getIn(['causes', 'info', 'sectors']),
    selectedSectors: state.getIn(['filter', 'sectors']),

    timeOfDays: state.getIn(['causes', 'info', 'timeOfDays']),
    selectedTimeOfDays: state.getIn(['filter', 'timeOfDays']),

    durations: state.getIn(['causes', 'info', 'durations']),
    selectedDurations: state.getIn(['filter', 'durations']),

    skills: state.getIn(['causes', 'info', 'skills']),
    selectedSkills: state.getIn(['filter', 'skills']),

    organizations: state.getIn(['causes', 'info', 'organizations']),
    selectedOrganizations: state.getIn(['filter', 'organizations']),

    ages: state.getIn(['causes', 'info', 'ages']),
    selectedAges: state.getIn(['filter', 'ages']),

    weekDays: state.getIn(['causes', 'info', 'weekDays']),
    selectedWeekDays: state.getIn(['filter', 'weekDays']),

    idealFor: state.getIn(['causes', 'info', 'idealFor']),
    selectedIdealFor: state.getIn(['filter', 'idealFor']),
  }),
  dispatch => ({
    filterActions: bindActionCreators(filterActions, dispatch)
  })
)(CauseFilters);
