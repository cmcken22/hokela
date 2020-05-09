import React, { Component } from 'react'
import axios from 'axios';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    console.clear();
    console.log('CLICK');
    // axios.get('http://localhost:8080/login').then(res => {
    //   console.log('DONE:', res);
    // });
  }

  render() {
    const gState = '123';
    const scope = 'https://www.googleapis.com/auth/plus.me';
    const prompt = 'select_account';
    const includeGrantedScopes = true;
    const redirectUri = process.env.REDIRECT_URI_TOKEN;
    // const responseType = 'token';
    const responseType = 'code';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&include_granted_scopes=${includeGrantedScopes}&response_type=${responseType}&state=${gState}&redirect_uri=${redirectUri}&client_id=${process.env.CLIENT_ID}&prompt=${prompt}`;
    console.log('URL:', url);

    return(
      <div className='App'>
        Hello World!!!!
        <a href={url}>login</a>
        {/* <a onClick={this.handleClick}>login</a> */}
      </div>
    );
  }
}

export default App
