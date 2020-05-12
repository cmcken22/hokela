import React, { Component } from 'react'
import cx from 'classnames';
import { Row, Col } from 'antd';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.initialOffset = props.initialOffset ? props.initialOffset : 0;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.parllax.style.backgroundPositionY = `${this.initialOffset}px`;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let offset = window.pageYOffset;
    this.parllax.style.backgroundPositionY = `${(offset * 0.5) + this.initialOffset}px`;
  }

  render() {
    const { type, children } = this.props;
    return(
      <div className={cx("hero", {
        [`hero--${type}`]: !!type
      })}>
        <div ref={r => this.parllax = r} className="hero__parallax">
          <div className="hero__content">
            <Row>
              <Col span={12}>
              </Col>
              <Col span={12}>
                {children}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

Hero.constants = {
  en: {
    labels: {
      addCause: 'ADD CAUSE',
      submit: 'SUBMIT',
      apply: 'APPLY',
      cancel: 'CANCEL'
    }
  }
};

export default Hero;
