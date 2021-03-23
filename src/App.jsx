import React, { Component } from 'react'
import axios from 'axios';
import cx from 'classnames';
import cookies from 'react-cookies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "antd/dist/antd.css";

// import NavBar from './components/Navbar';
import NavBar from './components/Navbar/NavBar';
// import Footer from './components/Footer';

// import Volunteers from './components/Volunteers';
// import Contact from './components/Contact';
// import Login from './components/Login';
// import Profile from './components/Profile';
import Causes from './components/Causes/Causes';
// import DetailedCause from './components/DetailedCause';
// import MyCauses from './components/MyCauses';
import Home from './components/Home/Home';
import CreateCause from './components/CreateCause/CreateCause';
import LanguageContext from './contexts/LanguageContext';
import history from './components/History';

import * as causeActions from './actions/causeActions';
import * as userActions from './actions/userActions';
import * as appActions from './actions/appActions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      isAdmin: false,
      user: null,
      language: 'en'
    }
  }

  componentDidMount() {
    this.initReduxStore();
    const accessToken = cookies.load('accessToken');
    this.setState({ loggedIn: !!accessToken }, () => this.getUserInfo(accessToken));

    this.count = 0;
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 18) {
        this.count++;
        let nextLanguage = 'esp';
        if (this.count % 2 === 0) nextLanguage = 'en';
        this.handleLanguageUpdate(nextLanguage);
      }
    });

    this.detectDevice();
  }

  detectDevice = () => {
    const { appActions } = this.props;
    let isMobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
      isMobile = true;
    }
    appActions.setMobileView(isMobile);
  }

  handleLanguageUpdate = (lang = 'en') => {
    this.setState({ language: lang });
  }

  initReduxStore = () => {
    const { causeActions } = this.props;
    // causeActions.getCauses().then(res => {
    //   if (res) causeActions.getAllApplicants();
    // });
    causeActions.getCauses();
    causeActions.getHokelaCauses();
    // causeActions.getLatestCauses();
  }

  getUserInfo = (accessToken) => {
    const { userActions } = this.props;
    if (!accessToken) return;
    userActions.initUserInfo(accessToken);
  }

  handleLogin = () => {
    // save current location to redirect back to this location on redirect
    const pathName = window.location.pathname.replace(/^(\/)/g, '');
    cookies.save('referrerPath', pathName, { path: '/' })
    
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
    cookies.remove('referrerPath', { path: '/' });
    userActions.cleaUserInfo();
  }

  render() {
    const { language } = this.state;
    const { isAdmin } = this.props;

    return (
      <LanguageContext.Provider
        value={{
          language,
          updateLanguage: this.handleLanguageUpdate
        }}
      >
        <Router history={history}>
          <div className="app">
            {isAdmin && (
              <div className="app__admin-overlay" />
            )}
            <NavBar
              onLogin={this.handleLogin}
              onLogout={this.handleLogout}
              history={history}
            />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/causes' component={Causes} />
              {/* <Route exact path='/causes/:causeId' component={DetailedCause} /> */}
              {/* <Route exact path='/my-causes' component={MyCauses} /> */}
              <Route exact path='/create-cause' component={CreateCause} />
              {/* <Route path='/volunteers' component={Volunteers} /> */}
              {/* <Route path='/contact' component={Contact} /> */}
              {/* <Route path='/login' component={Login} /> */}
              {/* <Route path='/:user_id' component={Profile} /> */}
            </Switch>
          </div>
        </Router>
      </LanguageContext.Provider>
    );
  }
}

export default connect(
  state => ({
    causes: state.get('causes'),
    isAdmin: state.getIn(['user', 'isAdmin'])
  }),
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch),
  })
)(App);
