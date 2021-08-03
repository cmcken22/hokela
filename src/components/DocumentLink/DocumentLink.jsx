import React, { Component } from 'react'
import cx from 'classnames';
import { FiExternalLink } from '@react-icons/all-files/fi/FiExternalLink';

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
    const { link, hideIcon } = this.props;

    return(
      <span
        onClick={this.handleClick}
        className="document-link"
      >
        <span className="document-link__text">
          {link}
          {!hideIcon && (
            <span className="document-link__icon">
              <FiExternalLink color="#212121" />
            </span>
          )}
        </span>
      </span>
    );
  }
}

export default DocumentLink
