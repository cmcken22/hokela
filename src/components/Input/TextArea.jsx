import React from 'react'
import Input from './Input';

class TextArea extends Input {
  constructor(props) {
    super(props);
  }

  renderComponent = () => {
    const { title, placeholder, value } = this.props;

    return (
      <textarea
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handeChange}
        placeholder={placeholder || title}
        value={value}
      />
    );
  }
}

export default TextArea;
