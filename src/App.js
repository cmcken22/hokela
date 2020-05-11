import React, { Component } from 'react'
import cookies from 'react-cookies';
import cx from 'classnames';
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
import Home from './components/Home/Home';

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
    const accessToken = cookies.load('accessToken');
    this.setState({ loggedIn: !!accessToken }, () => this.getUserInfo(accessToken));
  }

  getUserInfo = (accessToken) => {
    if (!accessToken) return;
    const { email, scopes } = jwt_decode(accessToken);
    const isAdmin = scopes.some(scope => scope === 'ROLE_ADMIN');
    this.setState({ user: email, isAdmin });
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

  render() {
    const { user, isAdmin } = this.state;
    return (
      <Router>
        <div className='app'>
          <NavBar user={user} onLogin={this.handleLogin} />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/causes' component={() => <Causes isAdmin={isAdmin} user={user} />}/>
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

export default App
