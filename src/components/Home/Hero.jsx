import React, { Component } from 'react'
import cx from 'classnames';
import { Row, Col } from 'antd';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.initialOffset = -100;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const parllax = document.querySelector(".hero__parallax");
    parllax.style.backgroundPositionY = `${this.initialOffset}px`;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const parllax = document.querySelector(".hero__parallax");
    let offset = window.pageYOffset;
    parllax.style.backgroundPositionY = `${(offset * 0.5) + this.initialOffset}px`;
  }

  render() {
    return(
      <div className="hero"> 
        <div className="hero__parallax">
          <div className="hero__content">
            <Row>
              <Col span={12}>
              </Col>
              <Col span={12}>
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
