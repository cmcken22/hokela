import React, { Component } from 'react';
import cx from 'classnames';
import './button.scss';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) onClick();
  }

  handlePress = (value) => {
    this.setState({ active: value });
  }

  render() {
    const { active } = this.state;
    const { children, className, secondary, caseSensitive, style, disabled } = this.props;

    return (
      <div
        onClick={this.handleClick}
        onMouseDown={() => this.handlePress(true)}
        onMouseUp={() => this.handlePress(false)}
        className={cx("xbtn", {
          [className]: !!className,
          "xbtn--active": active,
          "xbtn--primary": !secondary,
          "xbtn--secondary": secondary,
          "xbtn--disabled": disabled,
          "xbtn--case-sensitive": caseSensitive,
        })}
        style={style}
        disabled={disabled}
      >
        <span>{children}</span>
      </div>
    );
  }
}


export default Button;
