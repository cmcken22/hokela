import React, { Component } from 'react'
import axios from 'axios';
import cookies from 'react-cookies';
import cx from 'classnames';

import './App.scss';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    console.clear();
    console.log('CLICK');
    const accessToken = cookies.load('accessToken');
    this.setState({ loggedIn: !!accessToken });
  }

  handleClick = () => {
    
  }

  render() {
    const { loggedIn } = this.state;
    const gState = '123';
    const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
    // const scope = 'https://www.googleapis.com/auth/v1/people/me';
    // const scope = 'https://www.googleapis.com/plus/v1/people/me';
    const prompt = 'select_account';
    const includeGrantedScopes = false;
    const redirectUri = process.env.REDIRECT_URI_TOKEN;
    const responseType = 'code';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&include_granted_scopes=${includeGrantedScopes}&response_type=${responseType}&state=${gState}&redirect_uri=${redirectUri}&client_id=${process.env.CLIENT_ID}&prompt=${prompt}`;
    console.log('URL:', url);

    return(
      <div className={cx("app", "alwayshee", {
        "app--logged-in": loggedIn
      })}> 
        Hello World!!!!
        <a href={url}>login</a>
      </div>
    );
  }
}

export default App
