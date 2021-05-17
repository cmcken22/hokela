import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import cx from 'classnames';

import * as filterActions from '../../actions/filterActions';
import SearchBarInner from './SearchBarInner';
import Button from '../Button';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.animationDuration = 400;

    this.state = {
      active: props.active !== undefined ? props.active : null,
      inPortal: !!props.inPortal
    };
  }

  toggleState = () => {
    const { active } = this.state;
    const { onStateChange } = this.props;
    const nextActive = !active;

    if (nextActive) {
      this.setState({ active: nextActive }, () => {
        if (onStateChange) onStateChange(nextActive);
      });
    }
  }
  
  handleClick = (e) => {
    console.clear();
    console.log('CLICK', e);
  }

  renderSearchIcon = () => {
    const { active } = this.state;
    if (active !== false) return null;
    return (
      <>
        <p>
          Search for causes
        </p>
        <div className="xsearch-bar__icon">
          <SearchOutlined style={{ color: 'white' }} />
        </div>
      </>
    )
  }

  renderSearchBar = () => {
    const { active, inPortal } = this.state;
    if (inPortal) {
      return (
        <SearchBarInner />
      );
    }
    if (active !== true) return null;
    return (
      <SearchBarInner />
    );
  }

  handleSearch = () => {
    const { filterActions, history } = this.props;
    filterActions.performSearch();
    setTimeout(() => history.push('/causes'));
  }

  render() {
    const { active, inPortal } = this.state;
    const native = active && !inPortal;

    return (
      <div
        onClick={this.toggleState}
        id="searchBar"
        className={cx("xsearch-bar", {
          "xsearch-bar--small": active === false,
          "xsearch-bar--large": active === true,
          "xsearch-bar--padding": native
        })}
      >
        <div  className={cx("xsearch-bar__inner", {
          "xsearch-bar__inner--in-portal": inPortal,
          "xsearch-bar__inner--native": native,
        })}>
          <div className="xsearch-bar__input">
            {this.renderSearchIcon()}
            {this.renderSearchBar()}
          </div>
          {native && (
            <Button
              onClick={this.handleSearch}
              className="xsearch-bar__btn"
              caseSensitive
            >
              Search
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    filterActions: bindActionCreators(filterActions, dispatch)
  })
)(withRouter(SearchBar));