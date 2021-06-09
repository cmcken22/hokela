import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Tooltip } from 'antd';

import Button from 'Components/Button';
import * as volunteerActions from 'Actions/volunteerActions';
import { convertDaysToDuration } from 'Utils/index';
import SectorIcon from 'Components/SectorIcon';

class CauseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyApplied: false
    };
  }

  componentDidMount() {
    // this.checkIfUserApplied();
  }

  componentDidUpdate(prevProps) {
    const { email: prevEmail } = prevProps;
    const { email } = this.props;
    
    if (email !== prevEmail) {
      // this.checkIfUserApplied();
    }
  }

  checkIfUserApplied = async () => {
    const { accessToken, volunteerActions, cause: { _id: causeId } } = this.props;
    if (!accessToken) return;

    // const res = await volunteerActions.checkIfUserAppliedToCause(causeId);
    // this.setState({ alreadyApplied: res });
  }

  handleClick = () => {
    const { cause: { _id }, history, accessToken } = this.props;
    if (!!accessToken) {
      history.push(`/create-cause/${_id}`);
    }
  }

  openCause = () => {
    const { cause: { _id }, history } = this.props;
    history.push(`/causes/${_id}`);
  }

  handleApply = () => {
    const { cause, volunteerActions } = this.props;
    volunteerActions.setCause(cause);
    // volunteerActions.applyToCause(cause._id);
    // volunteerActions.setSuccessfulCause(cause);
  }

  getLocations = () => {
    const { cause: { locations } } = this.props;

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
    const { cause: { locations } } = this.props;

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

  renderTop = () => {
    const {
      cause: {
        name,
        organization,
        logo_link: logoLink,
      },
    } = this.props;

    return (
      <div className="cause-card__top">
        <div
          className="cause-card__logo"
          style={{
            backgroundImage: `url('${logoLink}')`
          }}
        />
        <div className="cause-card__cause-info">
          <h1>{name}</h1>
          <h2>{organization}</h2>
          {this.renderLocations()}
        </div>
      </div>
    );
  }

  renderBottom = () => {
    const {
      cause: {
        days,
        hours,
        sector,
        duration
      },
    } = this.props;

    return (
      <div className="cause-card__bottom">
        <div className="cause-card__icon">
          <SectorIcon.Outlined type={sector} />
        </div>
        <div />
        <div className="cause-card__additional-info">
          <p>{convertDaysToDuration(days)}</p>
          <p>{hours}</p>
        </div>
        <div className="cause-card__duration">
          <p>{duration}</p>
        </div>
      </div>
    );
  }

  renderButtonOverlay = () => {
    const { alreadyApplied } = this.state;

    return (
      <div className="cause-card__button-container">
        <Button
          secondary
          caseSensitive
          onClick={this.openCause}
        >
          Learn More
        </Button>
        <Button
          caseSensitive
          onClick={this.handleApply}
          disabled={alreadyApplied}
        >
          Apply
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div className="cause-card">
        {this.renderTop()}
        {this.renderBottom()}
        {this.renderButtonOverlay()}
      </div>
    );
  }
}

export default connect(
  state => ({
    accessToken: state.getIn(['user', 'accessToken']),
    email: state.getIn(['user', 'email'])
  }),
  dispatch => ({
    volunteerActions: bindActionCreators(volunteerActions, dispatch),
  })
)(withRouter(CauseCard));
