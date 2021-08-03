import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { Row, Col } from '../../components/Grid';
import Page from '../../components/Page';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <Page>
        <Page.Header
          title="Contact us"
          breadCrums={[{ name: 'Contact us' }]}
        />
      </Page>
    );
  }
}

ContactUs.constants = {
  en: {
    labels: {}
  }
};

export default withRouter(ContactUs);
