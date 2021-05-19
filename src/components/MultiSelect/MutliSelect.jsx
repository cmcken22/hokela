import React, { Component } from 'react'
import cx from 'classnames';
// import { Checkbox } from 'antd';
import Checkbox from '../Checkbox';

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

    if (this.ref && !this.ref.contains(e.target) && active) {
      this.toggleActive();
    }
  }

  toggleActive = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  handleSelect = (checked, value) => {
    const { onChange, selected } = this.props;
    const nextSelected = !!selected ? [...selected] : [];
    console.clear();
    console.log('checked:', checked);

    if (checked) {
      nextSelected.push(value);
    } else {
      const index = nextSelected.indexOf(value);
      nextSelected.splice(index, 1);
    }
    console.log('nextSelected:', nextSelected);
    if (onChange) onChange(nextSelected);
  }

  handleSelectAll = (checked) => {
    console.clear();
    console.log('checked:', checked);
    const { onChange, options } = this.props;
    const nextOptions = checked ? options : [];
    if (onChange) onChange(nextOptions);
  }

  renderOptions = () => {
    const { active, selectAllChecked } = this.state;
    const { options, selected, selectAll } = this.props;
    if (!active) return null;

    return (
      <div
        ref={r => this.drawerRef = r}
        className="multi__drawer"
      >
        {selectAll && (
          <div
            key={`multi__option--select-all`}
            className={cx("multi__option", { "multi__option--active": false })}
          >
            <Checkbox
              title="Select all"
              checked={selectAllChecked}
              onClick={(e) => this.handleSelectAll(e)}
            />
          </div>
        )}
        {options && options.map(option => {
          let active = false;
          if (selected && selected.indexOf(option) !== -1) active = true;
          return (
            <div
              key={`multi__option--${option}`}
              className={cx("multi__option", { "multi__option--active": active })}
            >
              <Checkbox
                title={option}
                checked={active}
                onClick={(e) => this.handleSelect(e, option)}
              />
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { active } = this.state;
    const { placeholder, customInput, className } = this.props;

    return(
      <div
        ref={r => this.ref = r}
        className={cx("multi", {
          "multi--active": active,
          [className]: className
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
