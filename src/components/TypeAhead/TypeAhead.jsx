import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { AutoComplete } from "antd";
import isEqual from 'lodash.isequal';

class TypeAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      options: []
    };
  }

  componentDidMount() {
    this.setOptions();
  }

  componentDidUpdate(prevProps) {
    const { options: prevOptions, value: prevValue } = prevProps;
    const { options, value } = this.props;
    if (!isEqual(prevOptions, options)) {
      this.setOptions();
    }
    if (!isEqual(prevValue, value)) {
      this.setState({ value });
    }
  }

  setOptions = () => {
    const { options } = this.props;
    const formattedOptions = !options ? [] : options.map(option => ({ label: option, value: option }));
    this.setState({ options: formattedOptions });
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    this.setState({ value }, () => {
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
