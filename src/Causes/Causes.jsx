import React, { Component } from 'react'
import axios from 'axios';
import cookies from 'react-cookies';
import cx from 'classnames';
import jwt_decode from 'jwt-decode';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className={cx("causes")}> 

      </div>
    );
  }
}

export default App
