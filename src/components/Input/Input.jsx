import React, { Component } from 'react'
import cx from 'classnames';

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
    const { title, placeholder, value } = this.props;

    return (
      <input
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handeChange}
        placeholder={placeholder || title}
        value={value}
      />
    );
  }

  render() {
    const { title, autoPopulated, error } = this.props;

    return(
      <div className={cx("xinput", {
        "xinput--autopopulated": autoPopulated,
        "xinput--error": !!error
      })}>
        <p>{title}</p>
        <div className="xinput__input-wrapper">
          {this.renderComponent()}
          {this.renderError()}
        </div>
      </div>
    );
  }
}

export default Input;
