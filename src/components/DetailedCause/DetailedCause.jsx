import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
// import isEqual from 'lodash.isequal';
import { Tooltip } from 'antd';

import * as causeActions from '../../actions/causeActions';
import * as bannerActions from '../../actions/bannerActions';
import * as volunteerActions from '../../actions/volunteerActions';
import { dateToString, convertDaysToDuration } from '../../utils';
// import * as CONSTANTS from '../../constants';

import BreadCrumbs from '../BreadCrumbs';
import Page from '../Page';
import { Row, Col } from '../Grid';
import Button from '../Button';
import Editor from '../Editor';

class DetailedCause extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyApplied: false
    };
    this.keyPressMap = {};
    this.openingEditMode = false;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.detectKeyPress);
    window.addEventListener('keyup', this.detectKeyRelease);
    window.scrollTo(0, 0);
    this.checkIfUserApplied();
  }
  
  componentDidUpdate(prevProps) {
    const { accessToken, cause } = this.props;
    const { accessToken: prevAccessToken, cause: prevCause } = prevProps;

    if (accessToken !== prevAccessToken || cause !== prevCause) {
      this.checkIfUserApplied();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.detectKeyPress);
    window.removeEventListener('keyup', this.detectKeyRelease);
  }

  checkIfUserApplied = async () => {
    const { accessToken, volunteerActions, cause } = this.props;
    if (!accessToken || !cause) return;

    const res = await volunteerActions.checkIfUserAppliedToCause(cause.get('_id'));
    this.setState({ alreadyApplied: res });
  }

  detectKeyPress = (e) => {
    const {
      history,
      isLoggedIn,
      match: { params: { causeId } }
    } = this.props;

    if (!!causeId && isLoggedIn) {
      this.keyPressMap[e.keyCode] = true;
      if (this.keyPressMap[69] && (this.keyPressMap[91] || this.keyPressMap[11]) && !this.openingEditMode) {
        this.openingEditMode = true;
        history.push(`/create-cause/${causeId}`);
      }
      if (this.keyPressMap[16] && this.keyPressMap[78] && !this.openingEditMode) {
        this.openingEditMode = true;
        history.push(`/create-cause`);
      }
    }
  }

  detectKeyRelease = (e) => {
    const {
      isLoggedIn,
      match: { params: { causeId } },
    } = this.props;

    if (!!causeId && isLoggedIn) {
      this.keyPressMap[e.keyCode] = false;
    }
  }

  renderBreadCrumbs = () => {
    const { cause } = this.props;

    const breadCrumbs = [{ name: 'Find Causes', path: '/causes' }];
    if (!!cause) {
      breadCrumbs.push({ name: cause.get('name') });
    }

    return (
      <BreadCrumbs crumbs={[...breadCrumbs]} />
    );
  }

  renderBanner = () => {
    const { cause } = this.props;
    const { alreadyApplied } = this.state;

    return (
      <div
        className="cause__banner"
        style={{
          backgroundImage: `url('${cause && cause.get('image_link')}')`
        }}
      >
        <div className="cause__banner__info">
          <h1>{cause && cause.get('name')}</h1>
          <Button
            caseSensitive
            disabled={alreadyApplied}
          >
            Apply
          </Button>
        </div>
      </div>
    );
  }

  renderNoCause = () => {
    const {
      en: { labels } 
    } = DetailedCause.constants;

    return (
      <Page>
        <div className="cause">
          {this.renderBreadCrumbs()}
          <h1>{labels.notFound}</h1>
        </div>
      </Page>
    );
  }

  renderSections = () => {
    const { cause } = this.props;
    const sections = cause.get('sections');

    if (!sections || !sections.size) return null;

    return (
      <>
        {sections.entrySeq().map(([, section]) => {
          return (
            <div className="cause__section">
              <h4 className="title">{section.get('title')}</h4>
              <Editor
                value={section.get('description')}
                readOnly
              />
            </div>
          );
        })}
      </>
    );
  }

  getLocations = (locations) => {
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

  formatLocations = (locations) => {
    if (!locations || !locations.length) return '';
    if (locations.length > 1) {
      return (
        <Tooltip placement="bottom" title={this.getLocations(locations)}>
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

  renderSideInfo = () => {
    const { cause } = this.props;
    const contact = cause.get('contact');
    const formattedDate = dateToString(cause.get('created_date'));
    const location = this.formatLocations(cause.get('locations') && cause.get('locations').toJS());

    const otherSkills = cause && cause.get('other_skills');
    const idealFor = cause && cause.get('ideal_for');
    console.clear();
    console.log('otherSkills:', otherSkills);

    return (
      <>
        <div className="cause__section cause__section--small">
          <h4 className="title">Overview</h4>
          <div
            className="cause__section__icon"
            style={{
              backgroundImage: `url('${cause && cause.get('logo_link')}')`
            }}
          />
          <p>{cause && cause.get('organization')}</p>
          <hr className="divider" />
          <div className="table">
            <div className="cell">
              <div className="cell-icon" />
              {location}
            </div>
            <div className="cell">
              <div className="cell-icon" />
              <p>{cause && cause.get('sector')}</p>
            </div>
            <div className="cell">
              <div className="cell-icon" />
              <p>{convertDaysToDuration(cause && cause.get('days'))}</p>
              <p>{cause && cause.get('hours')}</p>
            </div>
            <div className="cell">
              <div className="cell-icon" />
              <p>{cause && cause.get('duration')}</p>
            </div>
            <div className="cell">
              <div className="cell-icon" />
              <p>{cause && cause.get('ages')}</p>
            </div>
            <div className="cell">
              <div className="cell-icon" />
              <p>Posted on: {formattedDate}</p>
            </div>
          </div>
        </div>
        <div className="cause__section cause__section--small">
          <h4 className="title">Development</h4>
          <p>Other skills you'll develop</p>
          <hr className="divider" />
          <ul>
            {otherSkills && otherSkills.entrySeq().map(([, skill]) => (
              <li>{skill}</li>
            ))}
          </ul>
          <p>Ideal for</p>
          <hr className="divider" />
          <ul>
            {idealFor && idealFor.entrySeq().map(([, ideal]) => (
              <li>{ideal}</li>
            ))}
          </ul>
        </div>
        <div className="cause__section cause__section--small">
          <h4 className="title">Contact</h4>
          <hr className="divider" />
          <ul>
            <li>{contact && contact.get('name')}</li>
            <li>{contact && contact.get('email')}</li>
            <li>{contact && contact.get('phone')}</li>
            <li>{contact && contact.get('address')}</li>
            <li>{contact && contact.get('website')}</li>
          </ul>
        </div>
      </>
    );
  }

  render() {
    const {
      en: { labels } 
    } = DetailedCause.constants;

    const { cause } = this.props;
    if (!cause) return this.renderNoCause();


    return(
      <Page>
        <div className="cause">
          {this.renderBreadCrumbs()}
          {this.renderBanner()}

          <div className="cause__content">
            <Row>
              <Col span={8}>
                {this.renderSections()}
              </Col>
              <Col span={4}>
                {this.renderSideInfo()}
              </Col>
            </Row>
          </div>
        </div>
      </Page>
    );
  }
}

DetailedCause.constants = {
  en: {
    labels: {
      notFound: '404: Cause not found!',
      overview: 'Overview',
      applicants: 'Applicants',
      accept: 'ACCEPT',
      reject: 'REJECT'
    }
  }
};

export default connect(
  (state, props) => {
    const {
      match: { params },
    } = props;
    const { causeId } = params;
    return ({
      userInfo: state.get('user'),
      email: state.getIn(['user', 'email']),
      isAdmin: state.getIn(['user', 'isAdmin']),
      causes: state.get('causes'),
      cause: state.getIn(['causes', 'ALL', 'docs', causeId]),
      applicants: state.getIn(['causes', causeId, 'applicants']),
      isLoggedIn: !!state.getIn(['user', 'accessToken']),
      accessToken: state.getIn(['user', 'accessToken']),
    })
  },
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch),
    bannerActions: bindActionCreators(bannerActions, dispatch),
    volunteerActions: bindActionCreators(volunteerActions, dispatch)
  })
)(withRouter(DetailedCause));
