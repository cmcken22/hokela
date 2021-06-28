import React, { Component } from 'react'
import cx from 'classnames';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  handeChange = (e) => {
    const { onChange } = this.props;
    if (onChange) onChange(e);
  }

  handleFocus = (e) => {
    const { onFocus } = this.props;
    if (onFocus) onFocus(e);
  }

  handleBlur = (e) => {
    const { onBlur } = this.props;
    if (onBlur) onBlur(e);
  }

  renderTooltip = () => {
    const { tooltip } = this.props;
    if (!tooltip) return null;

    const alignConfig = {
      points: ['bl', 'tl'],
      offset: [-10, -10],
      overflow: {
        adjustX: true,
        adjustY: true
      }
    };

    return (
      <Tooltip
        placement="topLeft"
        title={tooltip}
        align={alignConfig}
      >
        <div className="xinput__tooltip">
          <QuestionCircleOutlined />
        </div>
      </Tooltip>
    );    
  }

  renderTitle = () => {
    const { title } = this.props;
    return (
      <div className="xinput__title">
        <p>{title}</p>
        {this.renderTooltip()}
      </div>
    );
  }

  renderError = () => {
    const { error } = this.props;
    if (!error) return;

    return (
      <>
        <div className="xinput__error-icon" />
        <p className="xinput__error-message">
          {error}
        </p>
      </>
    );
  }

  renderComponent = () => {
    const { title, placeholder, value, disabled } = this.props;

    return (
      <input
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handeChange}
        placeholder={placeholder || title}
        value={value}
        disabled={disabled}
      />
    );
  }

  render() {
    const { autoPopulated, error } = this.props;

    return(
      <div className={cx("xinput", {
        "xinput--autopopulated": autoPopulated,
        "xinput--error": !!error
      })}>
        {this.renderTitle()}
        <div className="xinput__input-wrapper">
          {this.renderComponent()}
          {this.renderError()}
        </div>
      </div>
    );
  }
}

export default Input;
