import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from 'Actions/appActions';

import { Row, Col } from 'Components/Grid';
import Page from 'Components/Page';
import Input from 'Components/Input';
import Button from 'Components/Button';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      showPassword: false,
      error: null
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyListener);
  }

  keyListener = (e) => {
    if (e.keyCode === 13) this.handleSubmit();
  }

  handleChange = (e) => {
    const { target: { value } } = e;
    this.setState({ value });
  }

  handleSubmit = () => {
    const { value } = this.state;
    const { appActions } = this.props;

    if (value === process.env.PASSWORD) {
      this.setState({ error: null });
      return appActions.setReady(true);
    }

    this.setState({ error: 'Please try again' });
    return appActions.setReady(false);
  }

  toggleshowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  render() {
    const { value, showPassword, error } = this.state;

    return (
      <Page hideFooter>
        <Page.Section>
          <div className="password">
            <Row>
              <Col span={10}>
                <h2>Welcome to the Test Environment!</h2>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Input
                  title="Enter Password"
                  type={showPassword ? "input" : "password"}
                  placeholder="Enter password to continue"
                  onChange={this.handleChange}
                  value={value}
                  error={error}
                />
              </Col>
              <Col span={2}>
                <div
                  onClick={this.toggleshowPassword}
                  className="password__toggle"
                >
                  {showPassword ? `Hide password` : `Show password`}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Button
                  caseSensitive
                  onClick={this.handleSubmit}
                >
                  Enter
                </Button>
              </Col>
            </Row>
          </div>
        </Page.Section>
      </Page>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    appActions: bindActionCreators(appActions, dispatch),
  })
)(Password);
