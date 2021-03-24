import React, { Component } from 'react';
import cx from 'classnames';

import './cause-card.scss';

class CauseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLocations = () => {
    const { locations } = this.props;

    if (!locations || !locations.length) return null;
    if (locations.length > 1) {
      return (
        <p className="cause-card__location">Multiple Locations</p>
      );
    }

    const [location] = locations;
    const { city, province } = location;
    const string = `${city}${province ? `, ${province}` : ''}`;

    return (
      <p className="cause-card__location">{string}</p>
    );
  }

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
          {this.renderLocations()}
        </div>
      </div>
    );
  }
}


export default CauseCard;
