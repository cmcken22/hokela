import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import cx from 'classnames';

import './footer.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <div className="footer__left">
          <p>Terms</p>
          <p>© 2021 by Hokela Technologies. All rights reserved</p>
        </div>
        <div className="footer__right">
          <div className="footer__icons">
            <div className="footer__icon footer__icon--facebook" />
            <div className="footer__icon footer__icon--instagram" />
            <div className="footer__icon footer__icon--linkedIn" />
          </div>
          <p>info@hokela.ca  |  Toronto, ON, Canada</p>
        </div>
      </div>
    );
  }
}

export default Footer;
