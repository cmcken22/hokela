import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { Row, Col } from '../../components/Grid';
import BreadCrumbs from '../../components/BreadCrumbs';
import Page from '../../components/Page';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <Page>
        <>
          <div className="contact">
            <BreadCrumbs crumbs={[{ name: 'Contact us' }]} />
            <Row>
              <Col span={12}>
                <h1>
                  Contact us
                </h1>
              </Col>
            </Row>
          </div>
        </>
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
