import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import * as causeActions from '../../actions/causeActions';
import * as bannerActions from '../../actions/bannerActions';
import * as volunteerActions from '../../actions/volunteerActions';

import BreadCrumbs from '../../components/BreadCrumbs';
import Page from '../../components/Page';
import { Row, Col } from '../../components/Grid';
import Button from '../../components/Button';
import Editor from '../../components/Editor';
import EmptyState from '../../components/EmptyState';
import NotFoundPage from '../../components/NotFoundPage/NotFoundPage';
import SideInfo from './SideInfo';
import Footer from './Footer';

class DetailedCause extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyApplied: false
    };
    this.keyPressMap = {};
    this.openingEditMode = false;
    this.checked = false;
  }

  componentDidMount() {
    this.loadCause();
    window.addEventListener('keydown', this.detectKeyPress);
    window.addEventListener('keyup', this.detectKeyRelease);
    window.scrollTo(0, 0);
  }
  
  componentDidUpdate(prevProps) {
    const { accessToken, cause, allCauses } = this.props;
    const { accessToken: prevAccessToken, cause: prevCause, allCauses: prevAllCauses } = prevProps;

    if (accessToken !== prevAccessToken || cause !== prevCause) {
      this.checkIfUserApplied();
    }
    if (allCauses !== prevAllCauses && !this.checked) {
      this.checked = true;
      this.detectIfCauseBelongsToCurrentPage();
    }
  }

  loadCause = async () => {
    const {
      causeActions,
      match: { params },
    } = this.props;
    const { causeId } = params;

    this.setState({ loading: true }, async () => {
      const cause = await causeActions.getCauseById(causeId);
      if (!!cause) {
        this.setState({
          cause,
          loading: false
        }, () => {
          this.detectIfCauseBelongsToCurrentPage()
          this.checkIfUserApplied();
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  detectIfCauseBelongsToCurrentPage = async () => {
    const { cause } = this.state;
    const { allCauses, causeActions } = this.props;
    if (!cause || !allCauses) return
    
    const currentCause = allCauses && allCauses.get(cause.get('_id'));
    if (!currentCause) causeActions.updatePages(cause.get('_id'));
  }

  setCause = (cause) => {
    this.setState({ loading: true }, async () => {
      window.scrollTo(0, 0);
      this.setState({
        cause,
        loading: false
      }, this.checkIfUserApplied);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.detectKeyPress);
    window.removeEventListener('keyup', this.detectKeyRelease);
  }

  checkIfUserApplied = async () => {
    const { cause } = this.state;
    const { accessToken, volunteerActions } = this.props;
    if (!accessToken || !cause) return;

    // const res = await volunteerActions.checkIfUserAppliedToCause(cause.get('_id'));
    // this.setState({ alreadyApplied: res });
  }

  detectKeyPress = (e) => {
    const {
      history,
      isAdmin,
      match: { params: { causeId } }
    } = this.props;

    if (!!causeId && isAdmin) {
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
      isAdmin,
      match: { params: { causeId } },
    } = this.props;

    if (!!causeId && isAdmin) {
      this.keyPressMap[e.keyCode] = false;
    }
  }

  renderBreadCrumbs = () => {
    const { cause } = this.state;

    const breadCrumbs = [{ name: 'Find Causes', path: '/causes' }];
    if (!!cause) {
      breadCrumbs.push({ name: cause.get('name') });
    }

    return (
      <BreadCrumbs crumbs={[...breadCrumbs]} />
    );
  }

  displayApplicationModal = () => {
    const { volunteerActions } = this.props;
    const { cause } = this.state;
    volunteerActions.setCause(cause && cause.toJS());
  }

  renderBanner = () => {
    const { cause } = this.state;
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
            onClick={this.displayApplicationModal}
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
      <NotFoundPage />
    );
  }

  loadingState = () => {
    return (
      <Page>
        <div className="cause">
          {this.renderBreadCrumbs()}
          <EmptyState
            title="Loading Cause..."
            size={100}
            loading
          />
        </div>
      </Page>
    );
  }

  renderSections = () => {
    const { cause } = this.state;
    const sections = cause.get('sections');

    if (!sections || !sections.size) return null;

    return (
      <>
        {React.Children.toArray(sections.entrySeq().map(([, section]) => {
          return (
            <div className="cause__section">
              <h4 className="title">{section.get('title')}</h4>
              <Editor
                value={section.get('description')}
                readOnly
              />
            </div>
          );
        }))}
      </>
    );
  }

  render() {
    const { cause, loading } = this.state;
    if (loading) return this.loadingState();
    if (!cause && !loading) return this.renderNoCause();

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
                <SideInfo cause={cause} />
              </Col>
            </Row>
          </div>
          <Row>
            <Col span={12}>
              <Footer
                key="footer"
                cause={cause}
                setCause={this.setCause}
                onApply={this.displayApplicationModal}
              />
            </Col>
          </Row>
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
    const currentPage = state.getIn(['causes', 'ALL', 'currentPage']);

    return ({
      // currentPage,
      // pages: state.getIn(['causes', 'ALL', 'pages']),
      allCauses: state.getIn(['causes', 'ALL', 'pages', currentPage, 'docs']),
      // nextPageToken: state.getIn(['causes', 'ALL', 'pages', currentPage, 'nextPageToken']),

      causeId,
      userInfo: state.get('user'),
      email: state.getIn(['user', 'email']),
      isAdmin: state.getIn(['user', 'isAdmin']),
      causes: state.get('causes'),
      applicants: state.getIn(['causes', causeId, 'applicants']),
      accessToken: state.getIn(['user', 'accessToken']),
    })
  },
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch),
    bannerActions: bindActionCreators(bannerActions, dispatch),
    volunteerActions: bindActionCreators(volunteerActions, dispatch)
  })
)(withRouter(DetailedCause));
