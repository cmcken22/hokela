import React, { Component } from 'react'
import cx from 'classnames';
import { Row, Col } from '../Grid';
import Button from '../Button';

class Hero extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { en: { labels } } = Hero.constants;
    return(
      <div className="hero">
        <Row>
          <Col span={12}>
            <h1>{labels.header}</h1>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={1}>
            <div id="searchBarMount" className="search">
              <p>No act of kindness is too small</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={5}>
            <Button
              className="hero__search-btn"
              caseSensitive
            >
              {labels.search}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

Hero.constants = {
  en: {
    labels: {
      header: 'Connecting volunteers with causes',
      search: 'Search'
    }
  }
};

export default Hero;
