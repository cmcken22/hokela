import React, { Component } from 'react'
import cx from 'classnames';
import Input from './Input';

class Radio extends Input {
  constructor(props) {
    super(props);
  }

  handleSelect = (value) => {
    this.handeChange({ target: { value } });
  }

  renderError = () => {
    const { error } = this.props;
    if (!error) return;

    return (
      <p className="xinput__error-message">
        {error}
      </p>
    );
  }

  renderComponent = () => {
    const { options, value } = this.props;

    return (
      <div className="xradio">
        {options && options.map(option => {
          const { title, value: radioValue } = option;
          return (
            <div 
              onClick={() => this.handleSelect(radioValue)}
              className={cx("xradio__option", {
                "xradio__option--selected": radioValue === value
              })}
            >
              <div className="xradio__input">
                <div className="xradio__input__inner" />
              </div>
              <p className="xradio__value">{title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Radio;
