import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { SearchOutlined } from '@ant-design/icons';
import cx from 'classnames';

import './search.scss';

class SearchBarInner extends Component {
  constructor(props) {
    super(props);
    // this.initialSearchBarPos = 264 - 100;
    this.initialSearchBarPos = null;

    this.state = {
      active: false,
      top: 264,
      test: false,
      small: false
    };
  }


  handleClick = () => {
    const { small } = this.props;
    console.clear();
    console.log('SMALL:', small);
  }

  componentWillUnmount() {
    console.clear();
    console.log('UNMOUNTEDDD');
    debugger;
  }

  render() {
    const { small } = this.props;
    // console.log('small:', small);
    if (!small) return null;

    return (
      <div className="search-bar__inner" onClick={this.handleClick}>
        <SearchOutlined />
      </div>
    )
  }
}

export default SearchBarInner;