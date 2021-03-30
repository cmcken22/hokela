import React, { Component } from 'react';
import { firebase } from '@firebase/app';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions';

class NavbarActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false 
    };
  }

  toggleDrawer = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  handleLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { userActions } = this.props;
    const provider = new firebase.auth.GoogleAuthProvider();
    this.toggleDrawer();

    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.clear();
        console.log('result:', result);
        const {
          additionalUserInfo: { profile },
          credential: { idToken },
        } = result;

        const {
          email,
          given_name: firstName,
          family_name: lastName
        } = profile;

        userActions.setUserInfo({
          email,
          firstName,
          lastName,
          accessToken: idToken
        });
      }).catch((error) => {
        console.clear();
        console.log('error:', error);
        userActions.cleaUserInfo();
      });
  }

  handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { userActions } = this.props;
    this.toggleDrawer();

    firebase.auth().signOut().then(() => {
      userActions.cleaUserInfo();
    }).catch((error) => {
      console.clear();
      console.log('error:', error);
      userActions.cleaUserInfo();
    });
  }

  render() {
    const { email } = this.props;
    const { active } = this.state;

    return (
      <div
        onClick={this.toggleDrawer}
        className="navbar__actions"
      >

        {active && (
          <div className="navbar__action-drawer">
            <button onClick={!email ? this.handleLogin : this.handleLogout} >
              {!email ? 'login' : 'logout'}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    userInfo: state.get('user'),
    email: state.getIn(['user', 'email']),
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(NavbarActions);
