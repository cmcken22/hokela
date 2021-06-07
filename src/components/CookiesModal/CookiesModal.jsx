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

  render() {
    const { cookiesAccepted } = this.props;
    if (cookiesAccepted !== null) return null;

    return(
      <div className="cookies-modal">
        <Button
          caseSensitive
          onClick={() => this.acceptCookies(true)}
        >
          Accept Cookies
        </Button>

        <p
          onClick={() => this.acceptCookies(false)}
          className="cookies-modal__deny-link"
        >
          Deny
        </p>
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
