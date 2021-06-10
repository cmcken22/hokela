import React, { Component } from 'react';
import { render, createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import cookies from 'react-cookies';
import ReactGA from 'react-ga';

import * as appActions from '../../actions/appActions';
import * as userActions from '../../actions/userActions';

import SearchBar from '../SearchBar';
import NavbarActions from './NavbarActions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.initialSearchBarPos = 264;
    this.renderCount = 0;
    this.ReactGA = null;

    this.pages = [
      {
        title: 'Home',
        link: '/'
      },
      {
        title: 'Find Causes',
        link: '/causes'
      },
      {
        title: 'Find Volunteers',
        link: '/find-volunteers'
      },
      {
        title: 'About us',
        link: '/about'
      },
      {
        title: 'Contact us',
        link: '/contact'
      },
    ]

    this.state = {
      activeTab: null,
      extended: null,
      opacity: 0,
      renderInPortal: true,
      searchBarActive: true
    };
  }

  componentDidMount() {
    const { history } = this.props;
    this.checkForUserCookies();
    this.updateBackground();
    window.addEventListener('scroll', this.updateBackground);
    window.addEventListener('scroll', this.detectRenderInPortal);
    this.detectLocation(window.location);
    history.listen(this.detectLocation);
    this.renderInner();
  }

  componentDidUpdate(prevProps) {
    const { cookiesAccepted } = this.props;
    const { cookiesAccepted: prevCookiesAccepted } = prevProps;

    if (cookiesAccepted !== prevCookiesAccepted && cookiesAccepted) {
      this.ReactGA = ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRAKING_ID);
    }
  }

  checkForUserCookies = () => {
    const { userActions } = this.props;
    const userEmail = cookies.load('email');
    const accessToken = cookies.load('accessToken');
    if (userEmail) {
      userActions.setUserInfo({ email: userEmail, accessToken });
    }
  }

  detectLocation = (data) => {
    const { appActions } = this.props;
    const { pathname } = data;

    let activeTab = null;
    if (pathname === '/' || pathname === '/home') {
      activeTab = 'Home';
    } else {
      const [, targetPath] = pathname.split('/');
      this.pages.forEach(tab => {
        const { link, title } = tab;
        if (link.indexOf(targetPath) !== -1) activeTab = title;
      });
    }

    if (this.ReactGA) this.ReactGA.pageview(window.location.pathname);
    
    const searchBarActive = activeTab === 'Home';
    appActions.setCurrentPage(activeTab);

    this.setState({
      searchBarActive: searchBarActive,
      activeTab
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateBackground);
    window.removeEventListener('scroll', this.detectRenderInPortal);
  }

  updateBackground = () => {
    const { active } = this.state;
    const { scrollY } = window;
    let opacity = scrollY * 0.015;

    let nextActive = opacity >= 2.8;
    if (active) nextActive = opacity === 0 ? false : true;

    this.setState({ opacity: opacity > 1 ? 1 : opacity });
  }

  handleTabClick = (tab) => {
    const { history } = this.props;
    const { title, link } = tab;
    this.setState({ activeTab: title }, () => {
      history.push(link);
    });
  }

  renderTabs = () => {
    const { activeTab, opacity } = this.state;

    return (
      <div className="navbar__content">
        {React.Children.toArray(this.pages.map(tab => {
          const { title } = tab;
          return (
            <div 
              onClick={() => this.handleTabClick(tab)}
              className={cx("navbar__tab", {
                "navbar__tab--active": activeTab === title
              })}
            >
              <div className="navbar__tab__inner">
                <p>{title}</p>
                {activeTab === title && (
                  <div className="navbar__tab-line" />
                )}
              </div>
            </div>
          );
        }))}
      </div>
    );
  }

  renderSearchBar = () => {
    return (
      <div className="search">
      </div>
    )
  }

  detectRenderInPortal = () => {
    const { extended } = this.state;
    const searchbar = document.getElementById('searchBarMount');
    const navbar = document.getElementById('navbar');
    if (!searchbar || !navbar) return;

    const nav = navbar.getBoundingClientRect();
    const ser = searchbar.getBoundingClientRect();

    var div1y = nav.top + nav.height;
    var div2y = ser.top;
    var distance = div1y - div2y;
    const nextRenderInPortal = !(distance >= 0);

    this.setState({ renderInPortal: nextRenderInPortal }, () => {
      if (nextRenderInPortal && extended) {
        this.handleStateChange(false);
      }
    });
  }

  handleStateChange = (value) => {
    this.setState({ extended: value });
  }

  renderInner = () => {
    const { currentPage } = this.props;
    const { renderInPortal, searchBarActive } = this.state;

    if (!searchBarActive) return null;
    const mount = document.getElementById('searchBarMount');

    this.renderCount++;
    const initial = currentPage === 'Home' && this.renderCount <= 30;

    if (mount && renderInPortal === true) {
      return createPortal(
        <div className="navbar__second-tier">
          <SearchBar
            active
            onStateChange={this.handleStateChange}
            inPortal
            initial={initial}
          />
        </div>,
      mount);
    }

    return (
      <div className="navbar__second-tier">
        <SearchBar
          active={false}
          onStateChange={this.handleStateChange}
          initial={initial}
        />
      </div>
    )
  }

  render() {
    const { opacity, extended, searchBarActive } = this.state;

    return (
      <div
        id="navbar"
        className={cx("navbar", {
          "navbar--active": extended,
          "navbar--dark": searchBarActive === false
        })}
        style={{
          // background: searchBarActive ? `rgba(255, 255, 255, ${opacity})` : ''
          background: `rgba(255, 255, 255, ${opacity})`
        }}
      >
        <div className="navbar__inner">
          <div className="navbar__hokela-icons">
            <div className="navbar__hokela-icon navbar__hokela-icon--logo" />
            <div
              className="navbar__hokela-icon navbar__hokela-icon--text"
              style={{
                filter: searchBarActive ? `invert(${opacity})` : ''
              }}
            />
          </div>

          {this.renderTabs()}
          <NavbarActions />

        </div>
        <div
          className="navbar__test"
          style={{
            background: `rgba(255, 255, 255, ${opacity})`
          }}
        >
          {this.renderInner()}
          <div
            className="navbar__test__shadow"
            // style={{
            //   background: `rgba(255, 255, 255, ${opacity})`
            // }}
          >
            <div className="navbar__test__shadow__inner" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    userInfo: state.get('user'),
    email: state.getIn(['user', 'email']),
    animationStatus: state.getIn(['app', 'animate']),
    currentPage: state.getIn(['app', 'currentPage']),
    cookiesAccepted: state.getIn(['app', 'cookiesAccepted'])
  }),
  dispatch => ({
    appActions: bindActionCreators(appActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  })
)(withRouter(NavBar));
