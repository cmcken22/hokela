import React from 'react'
import { Row, Col } from 'antd';
import Hero from '../Hero';

const Home = () => {
  return (
    <div className="home">
      <Hero type="home" initialOffset={-100} />

      <Row className="home__content">
        <Col span={24}>
          content
        </Col>
      </Row>
    </div>
  )
}

export default Home
