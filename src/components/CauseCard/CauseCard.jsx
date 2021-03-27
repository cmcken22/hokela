import React, { Component } from 'react';
import cx from 'classnames';
import { withRouter } from "react-router-dom";

import './cause-card.scss';
import { Tooltip } from 'antd';

class CauseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getLocations = () => {
    const { locations } = this.props;

    let res = '';
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      const { city, province } = location;
      const string = `${city}${province ? `, ${province}` : ''}`;
      res += `${string}`;
      if (i !== locations.length - 1) res += '<br />';
    }

    return (
      <span dangerouslySetInnerHTML={{ __html: res }} />
    );
  }

  renderLocations = () => {
    const { locations } = this.props;

    if (!locations || !locations.length) return null;
    if (locations.length > 1) {
      return (
        <Tooltip placement="bottom" title={this.getLocations()}>
          <p className="cause-card__location">Multiple Locations</p>
        </Tooltip>
      );
    }

    const [location] = locations;
    const { city, province } = location;
    const string = `${city}${province ? `, ${province}` : ''}`;

    return (
      <p className="cause-card__location">{string}</p>
    );
  }

  handleClick = () => {
    const { _id, history } = this.props;
    history.push(`/create-cause/${_id}`);
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
      <div className="cause-card" onClick={this.handleClick}>
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


export default withRouter(CauseCard);
