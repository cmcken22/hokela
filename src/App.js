import React, { Component } from 'react'
import axios from 'axios';
import cookies from 'react-cookies';
import cx from 'classnames';
import jwt_decode from 'jwt-decode';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isAdmin: false
    };
  }

  componentDidMount() {
    console.clear();
    const accessToken = cookies.load('accessToken');
    console.log('accessToken:', accessToken);
    this.setState({ loggedIn: !!accessToken }, () => this.getUserScopes(accessToken));
  }

  getUserScopes = (accessToken) => {
    console.log('getUserScopes:', accessToken);
    if (accessToken) {
      const { scopes } = jwt_decode(accessToken);
      console.log('scopes:', scopes);
      const isAdmin = scopes.some(scope => scope === 'ROLE_ADMIN');
      console.log('isAdmin:', isAdmin);
      this.setState({ isAdmin });
    }
  }

  render() {
    const { loggedIn, isAdmin } = this.state;
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/cloud-platform'
    ]
    const gState = '123';
    const prompt = 'select_account';
    const includeGrantedScopes = false;
    const redirectUri = process.env.REDIRECT_URI_TOKEN;
    const responseType = 'code';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scopes.join(' ')}&include_granted_scopes=${includeGrantedScopes}&response_type=${responseType}&state=${gState}&redirect_uri=${redirectUri}&client_id=${process.env.CLIENT_ID}&prompt=${prompt}`;
    console.log('URL:', url);

    return(
      <div className={cx("app", {
        "app--logged-in": loggedIn
      })}> 
        Hello World!!!!
        <a href={url}>login</a>
        {isAdmin && (
          <p>YOU ARE AN ADMIN</p>
        )}
      </div>
    );
  }
}

export default App
