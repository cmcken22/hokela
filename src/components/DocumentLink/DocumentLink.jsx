import React, { Component } from 'react'
import cx from 'classnames';

class DocumentLink extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) onClick();
  }

  render() {
    const { link } = this.props;

    return(
      <span
        onClick={this.handleClick}
        className="document-link"
      >
        <span className="document-link__text">{link}</span>
        <span className="document-link__icon" />
      </span>
    );
  }
}

export default DocumentLink
