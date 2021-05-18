import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col } from '../Grid';
import './empty-state.scss';

class EmptyState extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, message } = this.props;

    return(
      <div className="empty">
        <Row>
          <Col offset={3} span={6}>
            <div className="empty__content">
              <div className="empty__icon" />
              <h4>{title}</h4>
              <p>{message}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

EmptyState.constants = {
  en: {
    labels: {}
  },
};

export default connect(
  state => ({
    // active: !!state.getIn(['volunteer', 'cause']),
    // cause: state.getIn(['volunteer', 'cause']),
  }),
  dispatch => ({
    // volunteerActions: bindActionCreators(volunteerActions, dispatch),
    // causeActions: bindActionCreators(causeActions, dispatch)
  })
)(EmptyState);
