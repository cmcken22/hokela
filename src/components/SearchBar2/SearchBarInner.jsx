import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as filterActions from '../../actions/filterActions';
import SearchBarOptions from './SearchBarOptions';
import MultiSelect from '../MultiSelect';
import { fromJS } from 'immutable';

class SearchBarInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null,
      tabs: [
        {
          title: "Location",
          description: "Where?",
          options: 'locations'
          // renderOptions: this.renderLocationOptions
        },
        // {
        //   title: "Sector",
        //   description: "For which industry?",
        //   renderOptions: this.renderSectorOptions
        // },
        {
          title: "Organization",
          description: "For who?",
          options: 'organizations'
          // renderOptions: this.renderSectorOptions
        },
        {
          title: "Time of day",
          description: "Select time(s) of day",
          options: 'timeOfDays'
          // renderOptions: this.renderTimeOptions
        },
        {
          title: "Commitment level",
          description: "For how long?",
          options: 'durations'
          // renderOptions: this.renderCommitmentOptions
        },
      ]
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClick = (tab) => {
    const { title } = tab;
    const { activeTab } = this.state;
    this.setState({ activeTab: activeTab === title ? null : title });
  }

  renderOptions = (tab) => {
    const { renderOptions } = tab;
    if (renderOptions) return renderOptions();
  }

  handleClickOutside = (e) => {
    if (!this.container) return;
    if (!this.container.contains(e.target)) {
      this.setState({ activeTab: null });
    } 
  }

  handleSelect = (value, type) => {
    const { filterActions } = this.props;
    filterActions.setFilterValue(type, value);
    setTimeout(() => filterActions.performSearch());
  }

  clearFilterValue = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    const { filterActions } = this.props;
    filterActions.clearFilterValue(type);
  }

  renderText = (text, selected) => {
    if (selected && selected.size) {
      const item = selected.get(0);
      return selected.size > 1 ? `${selected.size} items selected` : item;
    }
    return text;
  }

  renderInput = (tab, options) => {
    const { selectedOptions } = this.props;
    const { title, description } = tab;
    const selected = selectedOptions && selectedOptions.get(options);

    return (
      <div className="inner__input">
        <p className="inner__option-text">{title}</p>
        <p
          className={cx("inner__display-text", {
            "inner__display-text--active": selected && selected.size
          })}
        >
          {this.renderText(description, selected)}
        </p>
        {selectedOptions && selectedOptions.get(options) && selectedOptions.get(options).size && (
          <div
            onClick={(e) => this.clearFilterValue(e, options)}
            className="inner__clear-btn"
          >
            <p>&times;</p>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { allOptions, selectedOptions } = this.props;
    const { tabs, activeTab } = this.state;

    return (
      <div
        ref={r => this.container = r}
        className={cx("inner", {
          "inner--dark": !!activeTab
        })}
      >
        {tabs && tabs.map((tab, i) => {
          const { title, options } = tab;
          return (
            <div
              onClick={(e) => this.handleClick(tab)}
              className={cx("inner__tab", {
                "inner__tab--active": title === activeTab,
              })}
            >
              {i !== 0 && (
                <div className="inner__tab-border" />
              )}
              <MultiSelect
                customInput={() => this.renderInput(tab, options)}
                options={allOptions && allOptions.get(options)}
                selected={selectedOptions && selectedOptions.get(options)}
                onChange={(value) => this.handleSelect(value, options)}
              />
              {i !== tabs.length - 1 && (
                <div className="inner__tab-line" />
              )}
            </div>
          );
        })}
      </div>
    )
  }
}

export default connect(
  state => ({
    allOptions: state.getIn(['causes', 'info']), 
    selectedOptions: fromJS({
      locations: state.getIn(['filter', 'locations']),
      organizations: state.getIn(['filter', 'organizations']),
      timeOfDays: state.getIn(['filter', 'timeOfDays']),
      durations: state.getIn(['filter', 'durations']),
    }),
    // addresses: state.getIn(['causes', 'info', 'addresses']),
    // selectedLocations: state.getIn(['filter', 'locations']),

    // organizations: state.getIn(['causes', 'info', 'organizations']),
    // selectedOrganizations: state.getIn(['filter', 'organizations']),

    // timeOfDays: state.getIn(['causes', 'info', 'timeOfDays']),
    // selectedTimeOfDays: state.getIn(['filter', 'timeOfDays']),

    // durations: state.getIn(['causes', 'info', 'durations']),
    // selectedDurations: state.getIn(['filter', 'durations']),

    // locations: state.getIn(['causes', 'info', 'locations']),
    // selectedLocations: state.getIn(['filter', 'locations']),
  }),
  dispatch => ({
    filterActions: bindActionCreators(filterActions, dispatch)
  })
)(SearchBarInner);