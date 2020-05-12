import React, { Component } from 'react'
import cx from 'classnames';
import cookies from 'react-cookies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import "antd/dist/antd.css";

import NavBar from './components/NavBar';
import Volunteers from './components/Volunteers';
import Contact from './components/Contact';
import Login from './components/Login';
import Profile from './components/Profile';
import Causes from './components/Causes';
import DetailedCause from './components/DetailedCause';
import Home from './components/Home/Home';

import * as causeActions from './actions/causeActions';
import * as userActions from './actions/userActions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      isAdmin: false,
      user: null
    }
  }

  componentDidMount() {
    this.initReduxStore();
    const accessToken = cookies.load('accessToken');
    this.setState({ loggedIn: !!accessToken }, () => this.getUserInfo(accessToken));
  }

  initReduxStore = () => {
    const { causeActions } = this.props;
    causeActions.getCauses().then(res => {
      if (res) causeActions.getAllApplicants();
    });
  }

  getUserInfo = (accessToken) => {
    const { userActions } = this.props;
    if (!accessToken) return;
    userActions.initUserInfo(accessToken);
  }

  handleLogin = () => {
    const gState = '123';
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];
    const prompt = 'select_account';
    const includeGrantedScopes = false;
    const redirectUri = process.env.REDIRECT_URI_TOKEN;
    const responseType = 'code';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scopes.join(' ')}&include_granted_scopes=${includeGrantedScopes}&response_type=${responseType}&state=${gState}&redirect_uri=${redirectUri}&client_id=${process.env.CLIENT_ID}&prompt=${prompt}`;
    window.location.replace(url);
  }

  handleLogout = () => {
    const { userActions } = this.props;
    cookies.remove('accessToken', { path: '/' });
    userActions.cleaUserInfo().then(() => {
      window.location.reload();
    });
  }

  render() {
    return (
      <Router>
        <div className='app'>
          <NavBar
            onLogin={this.handleLogin}
            onLogout={this.handleLogout}
          />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/causes' component={Causes}/>
            <Route exact path='/causes/:causeId' component={DetailedCause}/>
            <Route path='/volunteers' component={Volunteers}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/login' component={Login}/>
            <Route path='/:user_id'component={Profile}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({
    causes: state.get('causes')
  }),
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  })
)(App);
