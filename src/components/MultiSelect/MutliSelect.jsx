import React, { Component } from 'react'
import cx from 'classnames';
import { Input } from "antd";
import { isEqual } from 'lodash';

import Checkbox from '../Checkbox';

class MutliSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      customValue: null
    };
  }

  componentDidMount() {
    this.checkIfAllSelected();
    document.addEventListener('click', this.clickListener);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickListener);
  }

  componentDidUpdate(prevProps) {
    const { selected, options } = this.props;
    const { selected: prevSelected, options: prevOptions } = prevProps;

    if (!isEqual(selected, prevSelected) || !isEqual(options, prevOptions)) {
      this.checkIfAllSelected();
    }
  }
  
  checkIfAllSelected = () => {
    const { selected } = this.props;
    const options = this.getAllAvailableOptions();
    if (!options || !options.length) return;
    if (!selected || !selected.length) return;

    this.setState({ selectAllChecked: options.length === selected.length });
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

    if (checked) {
      nextSelected.push(value);
    } else {
      const index = nextSelected.indexOf(value);
      nextSelected.splice(index, 1);
    }

    if (onChange) onChange(nextSelected);
    setTimeout(() => this.checkIfAllSelected());
  }

  handleSelectAll = (checked) => {
    const { onChange } = this.props;
    const nextOptions = checked ? this.getAllAvailableOptions() : [];
    this.setState({ selectAllChecked: checked });
    if (onChange) onChange(nextOptions);
  }

  handleCustomValueChange = (e) => {
    const { target: { value } } = e;
    this.setState({ customValue: value });
  }

  addCustomValue = () => {
    const { selected, onChange } = this.props;
    const { customValue } = this.state;

    if (!!customValue && customValue.length) {
      this.setState({ customValue: null });
      const nextSelected = !!selected ? [...selected] : [];
      nextSelected.push(customValue);
      if (onChange) onChange(nextSelected);
      if (!this.customValues) this.customValues = nextSelected;
    }
  }

  getAllAvailableOptions = () => {
    const { options, selected } = this.props;
    const opt1 = options || [];
    const opt2 = selected || [];
    const opt3 = this.customValues || [];
    return [...new Set([...opt1, ...opt2, ...opt3])];
  }

  renderOptions = () => {
    const { active, selectAllChecked, customValue } = this.state;
    const { options, selected, selectAll, allowCustomOptions } = this.props;
    if (!active) return null;

    const allAvailableOptions = this.getAllAvailableOptions();

    return (
      <div
        ref={r => this.drawerRef = r}
        className="multi__drawer"
      >
        {allowCustomOptions && (
          <div className="multi__custom-option-input">
            <Input
              value={customValue}
              onChange={this.handleCustomValueChange}
            />
            <p onClick={this.addCustomValue}>
              Add
            </p>
          </div>
        )}
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
        {allAvailableOptions && allAvailableOptions.map(option => {
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

  getInputValue = () => {
    const { placeholder, selected } = this.props;
    let value = placeholder;
    if (selected && selected.length) value = `${selected.length} item(s) selected`;
    return value;
  }

  render() {
    const { active } = this.state;
    const { placeholder, customInput, className, selected } = this.props;

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
            <p>{this.getInputValue()}</p>
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
