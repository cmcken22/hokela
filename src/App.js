import React, { Component } from 'react'
import axios from 'axios';
import cookies from 'react-cookies';
import cx from 'classnames';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Causes from './components/Causes';
import Volunteers from './components/Volunteers';
import Contact from './components/Contact';
import Login from './components/Login';
import Profile from './components/Profile';



class App extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null
    }
  }

  render() {
    return (
      <Router>
        <div className='app'>
          <NavBar user={this.state.user}/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/causes' component={Causes}/>
            <Route path='/volunteers' component={Volunteers}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/login' component={Login}/>
            <Route path='/:user_id'component={Profile}/>
          </Switch>
        </div>
      </Router>
    )
  }


}



// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       loggedIn: false
//     };
//   }

//   componentDidMount() {
//     const accessToken = cookies.load('accessToken');
//     this.setState({ loggedIn: !!accessToken });
//   }

//   handleClick = () => {

//   }

//   render() {
//     const { loggedIn } = this.state;
//     const gState = '123';
//     const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
//     // const scope = 'https://www.googleapis.com/auth/v1/people/me';
//     // const scope = 'https://www.googleapis.com/plus/v1/people/me';
//     const prompt = 'select_account';
//     const includeGrantedScopes = false;
//     const redirectUri = process.env.REDIRECT_URI_TOKEN;
//     const responseType = 'code';
//     const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&include_granted_scopes=${includeGrantedScopes}&response_type=${responseType}&state=${gState}&redirect_uri=${redirectUri}&client_id=${process.env.CLIENT_ID}&prompt=${prompt}`;
//     console.log('URL:', url);

//     return(
//       <div className={cx("app", {
//         "app--logged-in": loggedIn
//       })}> 
//         Hello World!!!!
//         <a href={url}>login</a>
//       </div>
//     );
//   }
// }

export default App
