import React, { Component } from 'react'
import cx from 'classnames';
import cookies from 'react-cookies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../../actions/appActions';
import Button from '../Button';


class CookiesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { appActions } = this.props;
    let cookiesAccepted = cookies.load('cookiesAccepted');
    if (!!cookiesAccepted) cookiesAccepted = JSON.parse(cookiesAccepted);
    if (cookiesAccepted) appActions.allowCookies(cookiesAccepted);
  }

  acceptCookies = (value) => {
    const { appActions } = this.props;
    appActions.allowCookies(value);
  }

  handleClick = (e) => {
    e.stopPropagation();
  }

  render() {
    const { cookiesAccepted } = this.props;
    if (cookiesAccepted !== null) return null;

    return(
      <div className="cookies-modal" onClick={this.handleClick}>

        <div className="cookies-modal__content">
          <div className="cookies-modal__message">
            <p>
              We use cookies to improve your browsing experience and make the application process super easy for you.
              By using our site, you agree to our use of cookies and other tracking technologies.
              To learn more about cookies, see our Terms.
            </p>
          </div>
          <Button
            caseSensitive
            onClick={() => this.acceptCookies(true)}
          >
            Continue
          </Button>

          <div
            className="cookies-modal__deny-btn"
            >
            <p
              onClick={() => this.acceptCookies(false)}
            >
              Decline
            </p>
          </div>
        </div>
      </div>
    );
  }
}

CookiesModal.constants = {
  en: {
    labels: {}
  }
};

export default connect(
  state => ({
    cookiesAccepted: state.getIn(['app', 'cookiesAccepted'])
  }),
  dispatch => ({
    appActions: bindActionCreators(appActions, dispatch)
  })
)(CookiesModal);
