import React, { Component } from 'react';
import cx from 'classnames';

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
        {
          title: "Sector",
          description: "For which industry?",
          renderOptions: this.renderLocationOptions
        },
        {
          title: "Time of day",
          description: "Select time(s) of day",
          renderOptions: this.renderLocationOptions
        },
        {
          title: "Commitment level",
          description: "For how long?",
          renderOptions: this.renderLocationOptions
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

  handleSelectLocation = (location) => {
    console.log('location:', location);
  }

  renderLocationOptions = () => {
    const locationOptions = [
      "Option 1",
      "Option 2",
      "Option 2",
      "Option 2",
    ];

    return (
      <SearchBarOptions
        options={locationOptions}
        onChange={this.handleSelectLocation}
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

export default SearchBarInner;