import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { render, createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import cx from 'classnames';

import './navbar.scss';
import SearchBar from '../SearchBar2';
import * as appActions from '../../actions/appActions';

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
      active: null,
      opacity: 0,
      test: false
    };
  }

  componentDidMount() {
    this.updateBackground();
    window.addEventListener('scroll', this.updateBackground);
    window.addEventListener('scroll', this.test);
    this.renderInner();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateBackground);
    window.removeEventListener('scroll', this.test);
  }

  updateBackground = () => {
    const { active } = this.state;
    const { appActions, animationStatus } = this.props;
    const { scrollY } = window;
    let opacity = scrollY * 0.015;

    let nextActive = opacity >= 2.8;
    if (active) nextActive = opacity === 0 ? false : true;

    this.setState({
      opacity: opacity > 1 ? 1 : opacity,
      // active: nextActive
    });

    // if (animationStatus !== nextActive) {
    //   appActions.setAnimationStatus(nextActive);
    // }
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

  // handleClick = () => {
  //   const { active } = this.state;
  //   this.setState({ active: !active });
  // }

  test = () => {
    const searchbar = document.getElementById('searchBarMount');
    const navbar = document.getElementById('navbar');
    if (!searchbar || !navbar) return;

    const nav = navbar.getBoundingClientRect();
    const ser = searchbar.getBoundingClientRect();

    // console.log('navTop:', navTop);
    // console.log('searhTop:', searhTop);

    // var div1x = nav.left + nav.width/2;
    var div1y = nav.top + nav.height;

    // get div2's center point
    // var div2x = ser.left + ser.width / 2;
    var div2y = ser.top;

    // calculate the distance using the Pythagorean Theorem (a^2 + b^2 = c^2)
    // var distanceSquared = Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
    var distance = div1y - div2y;

    console.log('distance:', distance);
    // if (distance >= 0) {
      this.setState({ test: distance >= 0 });
    // }
  }

  handleStateChange = (value) => {
    this.setState({ active: value });
  }

  renderInner = () => {
    const { active, test } = this.state;
    const mount = document.getElementById('searchBarMount');

    if (mount && test === false) {
      if (active === true) this.setState({ active: false });
      return createPortal(
        <div className="navbar__second-tier navbar__second-tier--blue">
          <SearchBar
            active
            onStateChange={this.handleStateChange}
            inPortal
          />
        </div>,
      mount);
    }

    return (
      <div className="navbar__second-tier navbar__second-tier--red">
        <SearchBar
          active={false}
          onStateChange={this.handleStateChange}
        />
      </div>
    )
  }

  render() {
    const { opacity, active } = this.state;

    return (
      <div
        id="navbar"
        className={cx("navbar", {
          "navbar--active": active
        })}
        style={{
          background: `rgba(255, 255, 255, ${opacity})`
        }}
      >
        <div className="navbar__inner">
          <div className="navbar__hokela-icons">
            <div className="navbar__hokela-icon navbar__hokela-icon--logo" />
            <div className="navbar__hokela-icon navbar__hokela-icon--text" />
          </div>

          {/* {!active && this.renderTabs()} */}

          <div className="navbar__actions" />
        </div>
        <div
          className="navbar__test"
          style={{
            background: `rgba(255, 255, 255, ${opacity})`
          }}
        >
          {this.renderInner()}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    userInfo: state.get('user'),
    email: state.getIn(['user', 'email']),
    animationStatus: state.getIn(['app', 'animate'])
  }),
  dispatch => ({
    appActions: bindActionCreators(appActions, dispatch)
  })
)(withRouter(NavBar));
