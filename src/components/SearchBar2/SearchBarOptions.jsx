import React, { Component } from 'react';
import cx from 'classnames';

class SearchBarOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.clickListener);
    });
  }
  
  componentWillUnmount() {
    window.removeEventListener('click', this.clickListener);
  }

  clickListener = (e) => {
    const { onClickOutside } = this.props;
    if (!this.ref) return;
    if (!this.ref.contains(e.target)) {
      if (onClickOutside) onClickOutside();
    }
  }

  handleSelectOption = (e, option) => {
    e.stopPropagation();
    const { onChange } = this.props;
    if (onChange) onChange(option);
  }

  render() {
    const { options, selected } = this.props;
    console.log('selected:', selected);

    return (
      <div
        ref={r => this.ref = r}
        className="inner__options"
      >
        {options && options.map((option, i) => {
          console.log('option:', option);
          let active = false;
          if (selected && selected.indexOf(option) !== -1) active = true;
          return (
            <div
              key={`option--${i}`}
              className="inner__option"
              onClick={(e) => this.handleSelectOption(e, option)}
            >
              <div className={cx("inner__selection", { "inner__selection--active": active })} />
              <p>{option}</p>
            </div>
          );
        })}
      </div>
    )
  }
}

export default SearchBarOptions;