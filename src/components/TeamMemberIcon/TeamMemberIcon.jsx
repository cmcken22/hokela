import React, { Component } from 'react'
import cx from 'classnames';

class TeamMemberIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openLink = (link) => {
    if (!link) return;
    window.open(link, "_blank");
  }

  render() {
    const { id, name, title, subtitle, linkedIn } = this.props;

    return(
      <div className="team-icon">
        <div className={cx("team-icon__icon", {
          [`team-icon__icon--${id}`]: !!id
        })}>
          <div className={cx("team-icon__hidden-image", {
            [`team-icon__hidden-image--${id}`]: !!id
          })} />
        </div>
        <div className="team-icon__info">
          <div className="team-icon__name">{name}</div>
          <div className="team-icon__title">{title}</div>
          {subtitle && (
            <div className="team-icon__subtitle">{subtitle}</div>
          )}
          {linkedIn && (
            <div
              onClick={() => this.openLink(linkedIn)}
              className="team-icon__linkedIn"
            />
          )}
        </div>
      </div>
    );
  }
}

export default TeamMemberIcon;
