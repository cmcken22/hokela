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

  getPlaceholder = () => {
    const { placeholder, selected } = this.props;
    let res = placeholder;
    if (selected && selected.length) {
      res = `${selected.length} item(s) selected`;
    }
    return res;
  }

  renderInput = () => {
    const { title } = this.props;
    const placeholder = this.getPlaceholder();

    return (
      <div className="xfilters__input">
        <p>{title}</p>
        <p>{placeholder}</p>
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
