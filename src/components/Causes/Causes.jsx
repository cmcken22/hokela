import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { fromJS } from 'immutable';
import { List } from 'immutable';
import shortid from 'shortid';

import { Row, Col } from '../Grid';
import * as causeActions from '../../actions/causeActions';
import * as filterActions from '../../actions/filterActions';
// import * as CONSTANTS from '../../constants';
// import CauseItem from '../CauseItem';
// import Hero from '../Hero';
// import AddCauseForm from '../AddCauseForm/AddCauseForm';
// import Footer from '../Footer';
import CauseCard from '../CauseCard';
import MapView from '../MapView';
import BreadCrumbs from '../BreadCrumbs';
import Page from '../Page';
import CauseFilters from '../CauseFilters/CauseFilters';

class Causes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      addCause: false,
      displayForm: false,
      formId: shortid.generate(),
      currentView: 'Grid View',
      search: "",
      searchTimerId: null
    };
    this.keyPressMap = {};
    this.openingEditMode = false;
  }

  componentDidMount() {
    const { filterActions } = this.props;
    filterActions.performSearch();
    window.addEventListener('keydown', this.detectKeyPress);
    window.addEventListener('keyup', this.detectKeyRelease);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.detectKeyPress);
    window.removeEventListener('keyup', this.detectKeyRelease);
  }

  detectKeyPress = (e) => {
    const {
      history,
      isLoggedIn
    } = this.props;

    if (isLoggedIn) {
      this.keyPressMap[e.keyCode] = true;
      if (this.keyPressMap[16] && this.keyPressMap[78] && !this.openingEditMode) {
        this.openingEditMode = true;
        history.push(`/create-cause`);
      }
    }
  }

  detectKeyRelease = (e) => {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      this.keyPressMap[e.keyCode] = false;
    }
  }

  disaplyForm = () => {
    const { displayForm } = this.state;
    this.setState({ displayForm: !displayForm, formId: shortid.generate() });
  }

  handleChange = (e, fieldName) => {
    const { target: { value } } = e;
    this.setState({ [fieldName]: value });
  }

  checkDisabled = () => {
    const { name, description, addCause } = this.state;
    if (!addCause) return false;
    if (!name || !description) return true;
    return false;
  }

  handleAddCause = () => {
    const { causeActions } = this.props;
    const { name, description } = this.state;
    causeActions.addCause(name, description).then(newCause => {
      if (newCause) this.resetForm();
    });
  }

  handleDelete = (id) => {
    const { causeActions } = this.props;
    causeActions.deleteCause(id);
  }

  resetForm = () => {
    this.setState({
      name: null,
      description: null,
      addCause: false
    });
  }

  updateView = (view) => {
    this.setState({ currentView: view });
  } 

  renderContent = () => {
    const { currentView } = this.state;
    return (
      <div className="causes__content">
        <Row>
          <Col span={12}>
            <div className="causes__views">
              <p
                className={cx("causes__view", {  "causes__view--active": currentView === 'Map View' })}
                onClick={() => this.updateView('Map View')}
              >
                Map View
              </p>
              {/* <p
                className={cx("causes__view", {  "causes__view--active": currentView === 'Table View' })}
                onClick={() => this.updateView('Table View')}
              >
                Table View
              </p> */}
              <p
                className={cx("causes__view", {  "causes__view--active": currentView === 'Grid View' })}
                onClick={() => this.updateView('Grid View')}
              >
                Grid View
              </p>
            </div>
          </Col>
        </Row>

        {currentView === 'Grid View' && this.renderCauses()}
        {currentView === 'Map View' && this.renderMapView()}
      </div>
    );
  }

  renderMapView = () => {
    const { causes } = this.props;
    return (
      <Row>
        <Col span={12}>
          <MapView causes={causes} />
        </Col>
      </Row>
    )
  }

  splitCauses = (causes, splitIndex = 3) => {
    if (!causes) return new List([]);

    const res = [];
    let index = 0;
    causes.entrySeq().forEach(([id, cause], i) => {
      if (i % splitIndex === 0 && i !== 0) {
        index++;
      }
      if (!res[index]) res[index] = [];
      res[index].push(cause);
    });
    return fromJS(res);
  }

  renderCauses = () => {
    const { causes, mobile } = this.props;
    const segmentedCauses = this.splitCauses(causes, mobile ? 2 : 3);

    return (
      <>
        {segmentedCauses && segmentedCauses.map(row => {
          return (
            <Row>
              {row.map(cause => {
                return (
                  <Col span={mobile ? 6 : 4}>
                    <CauseCard {...cause.toJS()} />
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </>
    );
  }

  handleSearchChange = (e) => {
    const { searchTimerId } = this.state;
    const { filterActions } = this.props;
    const { target: { value } } = e;

    this.setState({ search: value }, () => {
      const { search } = this.state;
      filterActions.setFilterValue('search', search);

      if (search.length >= 3 || search === '') {
        if (searchTimerId) clearTimeout(searchTimerId);
        const nextSearchTimerId = setTimeout(() => {
          filterActions.performSearch();
        }, 500);
        this.setState({ searchTimerId: nextSearchTimerId });
      }
    });
  }

  render() {
    const { search } = this.state;

    return(
      <Page>
        <>
          <div className="causes">
            <BreadCrumbs crumbs={[{ name: 'Find Causes' }]} />

            <Row>
              <Col span={12}>
                <h1>Explore all causes</h1>
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <div className="causes__search">
                  <input
                    placeholder="Search by key word(s)"
                    value={search}
                    onChange={this.handleSearchChange}
                  />
                </div>
              </Col>
            </Row>

            <CauseFilters />

            {this.renderContent()}

            {/* <AddCauseForm
            key={formId}
            display={displayForm}
            onClose={this.disaplyForm}
          /> */}
          </div>
          {/* <Footer /> */}
        </>
      </Page>
    );
  }
}

Causes.constants = {
  en: {
    labels: {
      findCauses: 'FIND CAUSES',
      addCause: 'ADD CAUSE',
      submit: 'SUBMIT',
      apply: 'APPLY',
      cancel: 'CANCEL',
      review: 'REVIEW',
      moreInfo: 'MORE INFO',
      approve: 'APPROVE',
      reject: 'REJECT',
      pendingReview: 'Pending Review',
      rejected: 'Rejected',
    }
  }
};

export default connect(
  state => ({
    userInfo: state.get('user'),
    email: state.getIn(['user', 'email']),
    isAdmin: state.getIn(['user', 'isAdmin']),
    causes: state.getIn(['causes', 'ALL', 'docs']),
    mobile: state.getIn(['app', 'mobile']),
    filter: state.get('filter'),
    isLoggedIn: !!state.getIn(['user', 'accessToken'])
  }),
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch),
    filterActions: bindActionCreators(filterActions, dispatch)
  })
)(withRouter(Causes));
