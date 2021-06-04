import React, { Component } from 'react'
import cx from 'classnames';
import Input from '../Input';

class Select extends Input {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick);
  }

  handleClick = (e) => {
    const { active } = this.state;
    const { target } = e;
    if (!this.container || !active) return;

    if (!this.container.contains(target)) {
      this.closeDrawer();
      this.handleBlur();
    }
  }

  handleSelect = (option) => {
    const { value } = option;
    this.handeChange(value);
    this.closeDrawer();
  }

  openDrawer = () => {
    this.setState({ active: true });
  }

  closeDrawer = () => {
    this.setState({ active: false });
  }

  getTitleFromValue = () => {
    const { value, placeholder } = this.props;
    if (!value) return placeholder;

    const { options } = this.props;
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) return selectedOption.title;
    return placeholder;
  }

  renderComponent = () => {
    const { active } = this.state;
    const { value, placeholder, options, disabled } = this.props;
    const selectedTitle = this.getTitleFromValue();

    return (
      <div
        ref={r => this.container = r}
        className={cx("xselect", {
          "xselect--active": active,
          "xselect--disabled": disabled,
        })}
      >
        <div
          onClick={this.openDrawer}
          className={cx("xselect__input", {
            "xselect__input--placeholder": selectedTitle === placeholder || !value
          })}
        >
          <p>{selectedTitle}</p>
        </div>
        {active && (
          <div className="xselect__drawer">
            {options && options.map(option => {
              const { title, value: optionValue, disabled } = option;
              return (
                <div
                  onClick={() => this.handleSelect(option)}
                  className={cx("xselect__option", {
                    "xselect__option--selected": optionValue === value,
                    "xselect__option--disabled": disabled,
                  })}
                >
                  <p>{title}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Select;
