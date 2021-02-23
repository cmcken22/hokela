import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { SearchOutlined } from '@ant-design/icons';
import cx from 'classnames';

import './search.scss';

class SearchBarInner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      small: false
    };
  }

  componentDidMount() {
    const { small } = this.props;
    this.setState({ small });
  }


  handleClick = () => {
    const { small } = this.state;
    console.clear();
    console.log('SMALL:', small);
    if (small) {
      console.log('LETS MAKE THIS BITCH BIGGER');
      this.setState({ small: false });
    }
  }

  renderSmallSearchBar = () => {
    return (
      <SearchOutlined />
    );
  }

  renderSearchBar = () => {
    return (
      <div>
        HELLLO
      </div>
    );
  }

  render() {
    const { small } = this.state;

    return (
      <div
        onClick={this.handleClick}
        className={cx("search-bar__inner", {
          "search-bar__inner--small": small
        })}
      >
        {small ? this.renderSmallSearchBar() : this.renderSearchBar()}
      </div>
    )
  }
}

export default SearchBarInner;