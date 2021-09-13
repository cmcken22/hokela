import React, { Component, PureComponent } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { AutoComplete } from "antd";
import isEqual from 'lodash.isequal';
import Fuse from "fuse.js";

class TypeAhead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      options: []
    };
    this.timer = null;
  }

  componentDidMount() {
    this.initializeOptions();
  }

  componentDidUpdate(prevProps) {
    const { options: prevOptions, value: prevValue } = prevProps;
    const { options, value } = this.props;
    if (!isEqual(prevOptions, options)) {
      this.initializeOptions();
    }
    if (!isEqual(prevValue, value)) {
      this.setState({ value });
    }
  }

  initializeOptions = () => {
    const { options } = this.props;
    const formattedOptions = !options ? [] : options.map(option => ({ label: option, value: option }));
    this.setState({ options: formattedOptions });
  }

  filterOptions = (value) => {
    const { options } = this.state;

    if (!value || value === '') {
      return this.initializeOptions();
    }

    const config = {
      shouldSort: true,
      threshold: 0.4,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      ignoreLocation: true,
      keys: ["label"]
    };

    const fuse = new Fuse(options, config);
    const res = fuse.search(value);
    if (res && res.length) {
      const newOptions = res.map(opt => opt.item);
      this.setState({ options: newOptions });
    }
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    this.setState({ value }, () => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => this.filterOptions(value), 250);

      if (onChange) onChange({ target: { value } });
    });
  }

  render() {
    const { value, options } = this.state;

    return(
      <div className="type-ahead">
        <AutoComplete
          value={value}
          options={options}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    active: state.getIn(['banner', 'active']),
    message: state.getIn(['banner', 'message']),
    status: state.getIn(['banner', 'status']),
    actions: state.getIn(['banner', 'actions'])
  }),
  dispatch => ({
    // bannerActions: bindActionCreators(bannerActions, dispatch),
    // causeActions: bindActionCreators(causeActions, dispatch)
  })
)(TypeAhead);
