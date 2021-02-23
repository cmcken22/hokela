import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { SearchOutlined } from '@ant-design/icons';
import cx from 'classnames';

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
          title: "Organization",
          description: "For who?",
          renderOptions: this.renderLocationOptions
        },
        {
          title: "Time of day",
          description: "Select time(s) of day",
          renderOptions: this.renderLocationOptions
        },
        {
          title: "Day of week",
          description: "Select day(s) of week",
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

  renderLocationOptions = () => {
    const locationOptions = [
      "Option 1",
      "Option 2",
      "Option 2",
      "Option 2",
    ];

    return (
      <div className="inner__options">
        {locationOptions && locationOptions.map(option => {
          return (
            <div className="inner__option">
              {option}
            </div>
          );
        })}
      </div>
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