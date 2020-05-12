import React from 'react'
import { Row, Col } from 'antd';
import Hero from './Hero';

const Home = () => {
  return (
    <div className="home">
      <Row>
        <Col span={24}>
          <Hero />
        </Col>
      </Row>
      <Row className="home__content">
        <Col span={24}>
          content
          {/* <Hero /> */}
        </Col>
      </Row>
    </div>
  )
}

export default Home
