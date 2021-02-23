import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from '../Grid';
import cx from 'classnames';

import Button from '../Button';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
      startFade: null,
      quoteIndex: 0
    }
    this.quotes = [
      "No act of kindness is too small",
      "yoooo",
      "sup bitch"
    ];
  }

  // componentDidUpdate(prevProps) {
  //   const { animationStatus: prevAnimationStatus } = prevProps;
  //   const { animationStatus } = this.props;

  //   if (!prevAnimationStatus && animationStatus) {
  //     console.clear();
  //     console.log('START');
  //   }
  //   if (prevAnimationStatus && !animationStatus) {
  //     console.clear();
  //     console.log('END');
  //   }
  // }

  // componentDidMount() {
  //   this.updateOpacity();
  //   window.addEventListener('scroll', this.updateOpacity);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.updateOpacity);
  // }

  // updateOpacity = () => {
  //   const { startFade } = this.state;
  //   if (!this.quoteRef) return;
  //   const { top } = this.quoteRef.getBoundingClientRect();

  //   var st = window.pageYOffset || document.documentElement.scrollTop;
  //   if (this.lastScrollTop || this.lastScrollTop === 0) {
  //     if (st > this.lastScrollTop) {
  //       if (startFade) {
  //         this.setState({ startFade: false }, () => {
  //           setTimeout(() => {
  //             this.changeQuote();
  //           }, 1500);
  //         });
  //       }
  //     } else {
  //       if (top >= 80 && !startFade) {
  //         this.setState({ startFade: true });
  //       }
  //     }
  //   }
  //   this.lastScrollTop = st <= 0 ? 0 : st;
  //   if (st === 0 && startFade) {
  //     this.setState({ startFade: false }, () => {
  //       setTimeout(() => {
  //         this.changeQuote();
  //       }, 1500);
  //     });
  //   }
  // }

  // changeQuote = () => {
  //   const rand = Math.floor(Math.random() * this.quotes.length);
  //   this.setState({ quoteIndex: rand });
  // }

  render() {
    const { en: { labels } } = Hero.constants;
    const { startFade, quoteIndex } = this.state;
    const quote = this.quotes[quoteIndex];

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
              {/* <p
                id="my-element"
                ref={r => this.quoteRef = r}
                className={cx("hero__quote", {
                  "hero__quote--fade-in": startFade === true,
                  "hero__quote--fade-out": startFade === false
                })}
              >
                {quote}
              </p> */}
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

export default connect(
  state => ({
    animationStatus: state.getIn(['app', 'animate'])
  }),
  dispatch => ({
    // appActions: bindActionCreators(appActions, dispatch)
  })
)(Hero);
