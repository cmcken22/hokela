import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import cx from 'classnames';

import './navbar.scss';
import SearchBar from '../SearchBar';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.initialSearchBarPos = 264;

    this.pages = [
      {
        title: 'Home',
        link: '/'
      },
      {
        title: 'Find Causes',
        link: '/'
      },
      {
        title: 'Find Volunteers',
        link: '/'
      },
      {
        title: 'About us',
        link: '/'
      },
      {
        title: 'Contact us',
        link: '/'
      },
    ]

    this.state = {
      activeTab: 'Home',
      active: false,
      opacity: 0
    };
  }

  componentDidMount() {
    this.updateBackground();
    window.addEventListener('scroll', this.updateBackground);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateBackground);
  }

  updateBackground = () => {
    const { active } = this.state;
    const { scrollY } = window;
    let opacity = scrollY * 0.015;

    let nextActive = opacity >= 2.8;
    if (active) nextActive = opacity === 0 ? false : true;
    console.log('nextActive:', active, nextActive, opacity);

    this.setState({
      opacity: opacity > 1 ? 1 : opacity,
      active: nextActive
    });
  }

  handleTabClick = (tab) => {
    const { title, link } = tab;
    this.setState({ activeTab: title }, () => {
      // TODO: got to link
      console.log('OPEN:', link);
    });
  }

  renderTabs = () => {
    const { activeTab, opacity } = this.state;

    return (
      <div
        className="navbar__content"
        style={{
          opacity: `${1 - opacity}`
        }}
      >
        {this.pages.map(tab => {
          const { title } = tab;
          return (
            <div className={cx("navbar__tab", {
              "navbar__tab--active": activeTab === title
            })}>
              <p onClick={() => this.handleTabClick(tab)}>
                {title}
              </p>
              {activeTab === title && (
                <div className="navbar__tab-line" />
              )}
            </div>
          )
        })}
      </div>
    );
  }

  renderSearchBar = () => {
    return (
      <div className="search">

      </div>
    )
  }

  render() {
    const { opacity, active } = this.state;

    return (
      <div
        className="navbar"
        style={{
          background: `rgba(0, 0, 0, ${opacity})`
        }}
      >
        <div className="navbar__hokela-icons">
          <div className="navbar__hokela-icon navbar__hokela-icon--logo" />
          <div className="navbar__hokela-icon navbar__hokela-icon--text" />
        </div>

        {!active && this.renderTabs()}

        <div id="mount" />
        <SearchBar
          active={active}
          opacity={opacity}
        />

        <div className="navbar__actions" />
      </div>
    );
  }
}

export default connect(
  state => ({
    userInfo: state.get('user'),
    email: state.getIn(['user', 'email'])
  }),
  dispatch => ({

  })
)(withRouter(NavBar));
