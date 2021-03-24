import React, { Component } from 'react'
import cx from 'classnames';
import { Checkbox } from 'antd';

import "./multi-select.scss";

class MutliSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.clickListener);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickListener);
  }

  clickListener = (e) => {
    const { active } = this.state;
    // console.clear();
    // console.log('target;', e.target);
    // console.log('TEST:', !this.ref.contains(e.target));
    if (this.ref && !this.ref.contains(e.target) && active) {
      // this.toggleActive();
    }
  }

  toggleActive = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  handleSelect = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    const { onChange } = this.props;
    if (onChange) onChange(value);
  }

  renderOptions = () => {
    const { active } = this.state;
    const { options, selected } = this.props;
    if (!active) return null;

    return (
      <div className="multi__drawer">
        {options && options.map(option => {
          let active = false;
          if (selected && selected.indexOf(option) !== -1) active = true;
          return (
            <div
              // onClick={(e) => this.handleSelect(e, option)}
              className={cx("multi__option", { "multi__option--active": active })}
            >
              <Checkbox
                checked={active}
                onChange={(e) => this.handleSelect(e, option)}
              >
                <p className="multi__option-label">{option}</p>
              </Checkbox>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { active } = this.state;
    const { placeholder, customInput } = this.props;

    return(
      <div
        ref={r => this.ref = r}
        className={cx("multi", {
          "multi--active": active,
          // [className]: className
        })}
      >
        {customInput ? (
          <div
            onClick={this.toggleActive}
            className="multi__custom"
          >
            {customInput()}
          </div>
          ) : (
          <div
            onClick={this.toggleActive}
            className="multi__input"
          >
            <p>{placeholder}</p>
          </div>
        )}

        {this.renderOptions()}
        
      </div>
    );
  }
}

MutliSelect.defaultProps = {
  placeholder: "Choose"
};

export default MutliSelect;
