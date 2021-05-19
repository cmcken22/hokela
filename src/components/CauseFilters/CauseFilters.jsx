import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../Button';
import FilterItem from './FilterItem';
import { Row } from '../Grid';

import * as filterActions from '../../actions/filterActions';
import "./cause-filters.scss";
import { isEqual } from 'lodash';

class CauseFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreFilters: !false,
      moreFiltersDisabled: false
    };
  }

  componentDidMount() {
    this.detectFilters();
  }

  componentDidUpdate(prevProps) {
    const { filters } = this.props;
    const { filters: prevFilters } = prevProps;

    if (!isEqual(filters, prevFilters)) {
      this.detectFilters();
    }
  }

  detectFilters = () => {
    const { filters } = this.props;
    const ages = filters && filters.get("ages");
    const idealFor = filters && filters.get("idealFor");
    const organizations = filters && filters.get("organizations");
    const weekDays = filters && filters.get("weekDays");

    if (!!ages || !!idealFor || !!organizations || !!weekDays) {
      this.setState({
        moreFilters: true,
        moreFiltersDisabled: true
      });
    } else {
      this.setState({ moreFiltersDisabled: false });
    }
  }

  handleChange = (value, type) => {
    const { filterActions } = this.props;
    filterActions.setFilterValues(type, value);
    setTimeout(() => filterActions.performSearch());
  }

  handleClear = (type) => {
    const { filterActions } = this.props;
    filterActions.clearFilterValue(type);
    setTimeout(() => filterActions.performSearch());
  }

  toggleMoreFilters = () => {
    const { moreFilters } = this.state;
    this.setState({ moreFilters: !moreFilters });
  }

  renderLocationFilter = () => {
    const {
      locations,
      selectedLocations,
    } = this.props;

    return (
      <div className="xfilters__col">
        <FilterItem
          title="Location"
          placeholder="Where?"
          options={locations && locations.toJS()}
          selected={selectedLocations && selectedLocations.toJS()}
          onChange={(value) => this.handleChange(value, "locations")}
          onClear={() => this.handleClear("locations")}
        />
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
        <FilterItem
          title="Sector"
          placeholder="Community, animals, etc."
          options={sectors && sectors.toJS()}
          selected={selectedSectors && selectedSectors.toJS()}
          onChange={(value) => this.handleChange(value, "sectors")}
          onClear={() => this.handleClear("sectors")}
        />
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
        <FilterItem
          title="Time of day"
          placeholder="Select time(s) of day"
          options={timeOfDays && timeOfDays.toJS()}
          selected={selectedTimeOfDays && selectedTimeOfDays.toJS()}
          onChange={(value) => this.handleChange(value, "timeOfDays")}
          onClear={() => this.handleClear("timeOfDays")}
        />
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
        <FilterItem
          title="Commitment level"
          placeholder="For how long?"
          options={durations && durations.toJS()}
          selected={selectedDurations && selectedDurations.toJS()}
          onChange={(value) => this.handleChange(value, "durations")}
          onClear={() => this.handleClear("durations")}
        />
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
        <FilterItem
          title="Skills"
          placeholder="Teaching, research, etc."
          options={skills && skills.toJS()}
          selected={selectedSkills && selectedSkills.toJS()}
          onChange={(value) => this.handleChange(value, "skills")}
          onClear={() => this.handleClear("skills")}
        />
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
        <FilterItem
          title="Organization"
          placeholder="Which organization?"
          options={organizations && organizations.toJS()}
          selected={selectedOrganizations && selectedOrganizations.toJS()}
          onChange={(value) => this.handleChange(value, "organizations")}
          onClear={() => this.handleClear("organizations")}
        />
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
        <FilterItem
          title="Age"
          placeholder="All ages or specific ranges?"
          options={ages && ages.toJS()}
          selected={selectedAges && selectedAges.toJS()}
          onChange={(value) => this.handleChange(value, "ages")}
          onClear={() => this.handleClear("ages")}
        />
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
        <FilterItem
          title="Day of week"
          placeholder="What days are you free?"
          options={weekDays && weekDays.toJS()}
          selected={selectedWeekDays && selectedWeekDays.toJS()}
          onChange={(value) => this.handleChange(value, "weekDays")}
          onClear={() => this.handleClear("weekDays")}
        />
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
        <FilterItem
          title="Suitable for"
          placeholder="Groups, retirees, etc."
          options={idealFor && idealFor.toJS()}
          selected={selectedIdealFor && selectedIdealFor.toJS()}
          onChange={(value) => this.handleChange(value, "idealFor")}
          onClear={() => this.handleClear("idealFor")}
        />
      </div>
    );
  }

  renderMoreFiltersBtn = () => {
    const { moreFilters, moreFiltersDisabled } = this.state;

    return (
      <div className="xfilters__col">
        <Button
          caseSensitive
          secondary
          onClick={this.toggleMoreFilters}
          disabled={moreFiltersDisabled}
        >
          {moreFilters ? "Less filters" : "More filters"}
        </Button>
      </div>
    );
  }

  render() {
    const { moreFilters } = this.state;

    return (
      <>
        <Row className="xfilters">
          {this.renderLocationFilter()}
          {this.renderSectorFilter()}
          {this.renderTimeOfDayFilter()}
          {this.renderCommitmentLevelFilter()}
          {moreFilters ? this.renderSkillsFilter() : this.renderMoreFiltersBtn()}
        </Row>

        {moreFilters && (
          <Row className="xfilters">
            {this.renderOrganizationFilter()}
            {this.renderAgeFilter()}
            {this.renderDayOfWeekFilter()}
            {this.renderIdealForFilter()}
            {this.renderMoreFiltersBtn()}
          </Row>
        )}
      </>
    );
  }
}

export default connect(
  state => ({
    filters: state.get('filter'),

    locations: state.getIn(['causes', 'info', 'locations']),
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
