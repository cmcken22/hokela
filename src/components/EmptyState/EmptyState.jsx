import React, { Component } from 'react'
import { LoadingOutlined } from '@ant-design/icons';

import { Row, Col } from '../Grid';
import './empty-state.scss';
import SpinningLogo from '../SpinningLogo/SpinningLogo';

class EmptyState extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, message, loading, size } = this.props;

    return(
      <div className="empty">
        <Row>
          <Col offset={3} span={6}>
            <div className="empty__content">
              {loading ? (
                <div
                  className="empty__icon"
                  style={{
                    height: `${size}px`,
                    width: `${size}px`
                  }}
                >
                  <SpinningLogo />
                </div>
              ) : (
                <div
                  className="empty__icon empty__icon--empty"
                  style={{
                    height: `${size}px`,
                    width: `${size}px`
                  }}
                />
              )}
              <h4>{title}</h4>
              <p>{message}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

EmptyState.defaultProps = {
  size: 60
}

EmptyState.constants = {
  en: {
    labels: {}
  },
};

export default EmptyState;
