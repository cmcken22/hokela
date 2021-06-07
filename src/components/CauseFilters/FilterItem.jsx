import React, { Component } from 'react'
import cx from 'classnames';
import MultiSelect from '../MultiSelect';

class FilterItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDisplayText = () => {
    const { placeholder, selected } = this.props;
    let res = placeholder;
    if (selected && selected.length) {
      const item = selected[0];
      res = `${selected.length === 1 ? item : `${selected.length} items selected`}`;
    }
    return res;
  }

  renderInput = () => {
    const { title, placeholder, selected } = this.props;
    const displayText = this.getDisplayText();

    return (
      <div className="xfilters__input">
        <div className="xfilters__top">
          <p>{title}</p>
          {selected && selected.length > 0 && (
            <div
              onClick={this.clearFilter}
              className="xfilters__clear-btn"
            >
              <span>&times;</span>
            </div>
          )}
        </div>
        <p
          className={cx("xfilters__display-text", {
            "xfilters__display-text--active": displayText !== placeholder
          })}
        >
          {displayText}
        </p>
      </div>
    );
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    if (onChange) onChange(value);
  }

  clearFilter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { onClear } = this.props;
    if (onClear) onClear();
  }

  render() {
    const { options, selected } = this.props;

    return (
      <div className="xfilters__item">
        <MultiSelect
          customInput={this.renderInput}
          options={options}
          selected={selected}
          onChange={this.handleChange}
          selectAll
        />
      </div>
    );
  }
}

export default FilterItem;
