import React, { Component } from 'react';
import cx from 'classnames';

import './cause-card.scss';

class CauseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   window.addEventListener('resize', this.handleResize);
  // }

  // handleResize = () => {
  //   this.upateHeight();
  // }

  // createRef = (r) => {
  //   this.ref = r;
  //   this.upateHeight();
  // }

  // upateHeight = () => {
  //   if (!this.ref) return;
  // }

  // AIzaSyBo25T4SXKR6Vf5r2yrD4XzFVJ2bgB8kUU

  render() {
    const {
      name,
      organization,
      location,
      image_link: imageLink,
      logo_link: logoLink,
      dark
    } = this.props;

    return (
      <div className="cause-card">
        <div className="cause-card__left">
          <div
            className="cause-card__logo"
            style={{
              backgroundImage: `url('${logoLink}')`
            }}
          />
          <div className="cause-card__sector-icon" />
        </div>
        <div className="cause-card__right">
          <p className="cause-card__name">{name}</p>
          <p className="cause-card__org">{organization}</p>
          <p className="cause-card__location">{location}</p>
        </div>
      </div>
    );
  }
}


export default CauseCard;
