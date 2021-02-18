import React, { Component } from 'react';
import cx from 'classnames';

import './card.scss';
// import SearchBar from '../SearchBar';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 311
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.upateHeight();
  }

  createRef = (r) => {
    this.ref = r;
    const { width } = this.ref.getBoundingClientRect();
    const height = width * 1.035;
    this.setState({ height });
  }

  upateHeight = () => {
    if (!this.ref) return;
    const { width } = this.ref.getBoundingClientRect();
    const height = width * 1.035;
    this.setState({ height });
  }

  render() {
    const { height } = this.state;
    const { title, company, location, imageLink, dark } = this.props;
    return (
      <div className={cx("xcard", {
        "xcard--dark": dark
      })}>
        <div
          ref={this.createRef}
          className="xcard__image"
          style={{
            height: `${height}px`,
            backgroundImage: `url(${imageLink})`
          }}
        />
        <div className="xcard__info">
          <h1>{title}</h1>
          <h2>{company}</h2>
          <h3>{location}</h3>
        </div>
      </div>
    );
  }
}


export default Card;
