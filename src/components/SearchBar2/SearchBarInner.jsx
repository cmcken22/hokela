import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as filterActions from '../../actions/filterActions';
import SearchBarOptions from './SearchBarOptions';

class SearchBarInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null,
      tabs: [
        {
          title: "Location",
          description: "Where?",
          renderOptions: this.renderLocationOptions
        },
        // {
        //   title: "Sector",
        //   description: "For which industry?",
        //   renderOptions: this.renderSectorOptions
        // },
        {
          title: "Organization",
          description: "For who?",
          renderOptions: this.renderSectorOptions
        },
        {
          title: "Time of day",
          description: "Select time(s) of day",
          // renderOptions: this.renderTimeOptions
        },
        {
          title: "Commitment level",
          description: "For how long?",
          // renderOptions: this.renderCommitmentOptions
        },
      ]
    }
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

  handleClickOutside = () => {
    const { activeTab } = this.state;
    console.log('activeTab:', activeTab);
    this.setState({ activeTab: null });
  }

  handleSelect = (value, type) => {
    const { filterActions } = this.props;
    filterActions.setFilterValue(type, value);
  }

  renderLocationOptions = () => {
    const { locations, selectedLocations } = this.props;
    const locationOptions = !!locations ? locations.toJS() : [];

    return (
      <SearchBarOptions
        options={locationOptions}
        selected={selectedLocations && selectedLocations.toJS()}
        onChange={(value) => this.handleSelect(value, 'locations')}
        onClickOutside={this.handleClickOutside}
      />
    );
  }

  renderSectorOptions = () => {
    const { organizations, selectedOrganizations } = this.props;
    const organizationOptions = !!organizations ? organizations.toJS() : [];

    return (
      <SearchBarOptions
        options={organizationOptions}
        selected={selectedOrganizations && selectedOrganizations.toJS()}
        onChange={(value) => this.handleSelect(value, 'organizations')}
        onClickOutside={this.handleClickOutside}
      />
    );
  }

  render() {
    const { tabs, activeTab } = this.state;

    return (
      <div
        className={cx("inner", {
          "inner--dark": !!activeTab
        })}
      >
        {tabs && tabs.map(tab => {
          const { title, description } = tab;
          return (
            <div
              onClick={(e) => this.handleClick(tab)}
              className={cx("inner__tab", {
                "inner__tab--active": title === activeTab,
              })}
            >
              <h1>{title}</h1>
              <h2>{description}</h2>
              {title === activeTab && this.renderOptions(tab)}
            </div>
          );
        })}
      </div>
    )
  }
}

export default connect(
  state => ({
    // userInfo: state.get('user'),
    // email: state.getIn(['user', 'email']),
    // isAdmin: state.getIn(['user', 'isAdmin']),
    // causes: state.getIn(['causes', 'ALL']),
    organizations: state.getIn(['causes', 'info', 'organizations']),
    selectedOrganizations: state.getIn(['filter', 'organizations']),
    locations: state.getIn(['causes', 'info', 'locations']),
    selectedLocations: state.getIn(['filter', 'locations']),
  }),
  dispatch => ({
    filterActions: bindActionCreators(filterActions, dispatch)
  })
)(SearchBarInner);