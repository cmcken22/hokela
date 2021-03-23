import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { AutoComplete } from "antd";

// import * as causeActions from '../../actions/causeActions';
// import * as bannerActions from '../../actions/bannerActions';
import "./type-ahead.scss";
import isEqual from 'lodash.isequal';

class TypeAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      suggestion: '',
      options: [
        // {
        //   label: "Hokela Technologies",
        //   value: "Hokela Technologies"
        // },
        // {
        //   label: "Toronto Humane Society",
        //   value: "Toronto Humane Society"
        // }
      ]
    };
  }

  componentDidMount() {
    this.setOptions();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.options, this.props.options)) {
      this.setOptions();
    }
  }

  setOptions = () => {
    const { options } = this.props;
    // console.clear();
    // console.log('options:', options);
    const formattedOptions = !options ? [] : options.map(option => ({ label: option, value: option }));
    // console.log('formattedOptions:', formattedOptions);
    this.setState({ options: formattedOptions });
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    // console.clear();
    // console.log('value:', value);
    this.setState({ value }, () => {
      if (onChange) onChange({ target: { value } });
    });
  }

  render() {
    const { value, suggestion, options } = this.state;
    return(
      <div
        className={cx("type-ahead", {
          // "banner--active": active,
          // [`banner--${status}`]: !!status,
          // [className]: className
        })}
      >
        {/* <Input
          className="type-ahead__input"
          value={value}
          onChange={this.handleChange}
        />
        <Input
          className="type-ahead__input--hidden"
          value={suggestion}
        /> */}
        <AutoComplete
          value={value}
          options={options}
          // onSelect={onSelect}
          // onSearch={onSearch}
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
