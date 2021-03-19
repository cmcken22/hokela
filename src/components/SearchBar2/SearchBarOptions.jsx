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
    console.clear();
    if (!this.ref.contains(e.target)) {
      console.log('CLICK OUTSIDE');
      if (onClickOutside) onClickOutside();
    }
  }

  handleSelectOption = (e, option) => {
    e.stopPropagation();
    const { onChange } = this.props;
    if (onChange) onChange(option);
  }

  render() {
    const { options } = this.props;

    return (
      <div
        ref={r => this.ref = r}
        className="inner__options"
      >
        {options && options.map((option, i) => {
          return (
            <div
              key={`option--${i}`}
              className="inner__option"
              onClick={(e) => this.handleSelectOption(e, option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    )
  }
}

export default SearchBarOptions;