import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from '../Grid';
import cx from 'classnames';

import * as filterActions from '../../actions/filterActions';
import Button from '../Button';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.moveBalls);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.moveBalls);
  }

  moveBalls = () => {
    if (!this.balls) return;
    const { scrollY } = window;
    const rate1 = scrollY *  0.35;
    const rate2 = scrollY *  0.25;

    for (let key in this.balls) {
      const ball = this.balls[key];
      if (key == 1) {
        ball.style.transform =  `translateY(${rate1}px)`
      } else {
        ball.style.transform =  `translateY(-${rate2}px)`
      }
    }
  }

  renderBalls = () => {
    if (!this.balls) this.balls = {};
    const balls = [
      {
        height: '468px',
        left: '-68px',
        bottom: '-237px',
        backgroundColor: `rgba(216, 216, 216, 0.4)`
      },
      {
        height: `382px`,
        right: '-150px',
        bottom: '87px',
        backgroundColor: `rgba(216, 216, 216, 0.14)`
      }
    ];

    return (
      <div className="hero__balls">
        {balls.map((ball, index) => {
          return (
            <div
              ref={r => this.balls[index] = r}
              className={`hero__ball hero__ball--${index}`}
              style={{
                ...ball,
                width: ball.height
              }}
            >
            </div>
          );
        })}
      </div>
    );
  }

  handleSearch = () => {
    const { filterActions, history } = this.props;
    filterActions.performSearch();
    setTimeout(() => history.push('/causes'));
  }

  render() {
    const { en: { labels } } = Hero.constants;

    return(
      <div className="hero">
        {this.renderBalls()}
        <div className="hero__inner">
          <Row>
            <Col span={12}>
              <h1>{labels.header}</h1>
            </Col>
          </Row>
          <Row>
            <Col span={10} offset={1}>
              <div id="searchBarMount" className="search" />
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={5}>
              <Button
                className="hero__search-btn"
                caseSensitive
                onClick={this.handleSearch}
              >
                {labels.search}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Hero.constants = {
  en: {
    labels: {
      header: 'Find your next volunteer opportunity',
      search: 'Search'
    }
  }
};

export default connect(
  state => ({
    animationStatus: state.getIn(['app', 'animate'])
  }),
  dispatch => ({
    filterActions: bindActionCreators(filterActions, dispatch)
  })
)(withRouter(Hero));
