import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Button } from "antd";

import * as causeActions from '../../actions/causeActions';
import * as bannerActions from '../../actions/bannerActions';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  renderMessage = () => {
    const { message } = this.props;
    if (typeof message === 'function') return message();
    return message;
  }

  renderActions = () => {
    const { actions } = this.props;
    if (!actions) return null;
    const res = actions.map((action, i) => {
      return (
        <Button
          type={i === actions.length - 1 ? "primary" : null}
          className="action-btn"
          onClick={action.action}
        >
          {action.title}
        </Button>
      );
    });
    return res;
  }

  hideBanner = () => {
    const { bannerActions } = this.props;
    bannerActions.clearBanner();
  }

  render() {
    const { className, active, status } = this.props;

    return(
      <div
        className={cx("banner", {
          "banner--active": active,
          [`banner--${status}`]: !!status,
          [className]: className
        })}
      >
        <span className="banner__message">
          <div
            className={cx("banner__icon", {
              [`banner__icon--${status}`]: !!status
            })}
          />
          {this.renderMessage()}
        </span>
        <div className="banner__actions">
        {this.renderActions()}
        </div>
        <div className="banner__cancel-btn" onClick={this.hideBanner}>
          &times;
        </div>
      </div>
    );
  }
}

Banner.constants = {
  en: {
    labels: {

    }
  }
};

export default connect(
  state => ({
    active: state.getIn(['banner', 'active']),
    message: state.getIn(['banner', 'message']),
    status: state.getIn(['banner', 'status']),
    actions: state.getIn(['banner', 'actions'])
  }),
  dispatch => ({
    bannerActions: bindActionCreators(bannerActions, dispatch),
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(Banner));
