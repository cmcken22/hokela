import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../Button';
import { Row, Col } from '../Grid';
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
      res = `${selected.length} ${selected.length === 1 ? 'item' : 'items'} selected`;
    }
    return res;
  }

  renderInput = () => {
    const { title, placeholder } = this.props;
    const displayText = this.getDisplayText();

    return (
      <div className="xfilters__input">
        <p>{title}</p>
        <p
          className={cx("xfilters__display-text", {
            "xfilters__display-text--active": displayText !== placeholder
          })}
        >
          {displayText}</p>
      </div>
    );
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    if (onChange) onChange(value);
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
        />
      </div>
    );
  }
}

export default FilterItem;
