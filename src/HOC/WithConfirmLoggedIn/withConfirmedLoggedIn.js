import React, { Component } from 'react';
import { connect } from 'react-redux';
// import store from '../../index';
import { confirmLoggedIn } from '../../utils';


const withConfirmedLoggedIn = (ComponentToWrap) => {
  class WrappedItem extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidUpdate() {
      const { history } = this.props;
      if (!confirmLoggedIn()) {
        history.push('/');
      }
    }

    render = () => {
      return (
        <ComponentToWrap />
      );
    };
  }
  return connect(
    state => ({
      user: state.get('user')
    })
  )(WrappedItem);
};

export default withConfirmedLoggedIn;
